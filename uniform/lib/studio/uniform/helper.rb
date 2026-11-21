module Studio
  module Uniform
    module Helper
      def uniform_icon(name, small: false)
        classes = small ? "u-icon u-icon-sm" : "u-icon"
        Uniform.icon(name).sub("<svg", %(<svg class="#{classes}" aria-hidden="true")).html_safe
      end

      def uniform_mail
        Mail.for(formats.first)
      end

      # Only clients that load remote fonts (Apple Mail, iOS) use these, and only
      # with an absolute URL, so they need action_mailer.asset_host.
      def uniform_mail_fonts
        Mail::FONTS.to_h { |_, _, file| [file, asset_url("uniform/fonts/#{file}")] }.select { |_, url| url.start_with?("http") }
      end

      def uniform_form_with(**options, &)
        form_with(**options, builder: FormBuilder, class: ["u-form", options[:class]].compact.join(" "), &)
      end

      # Labels for a browser without JavaScript; uniform.js swaps Mod for ⌘ on a Mac.
      KEY_LABELS = {
        "Mod" => "Ctrl", "Control" => "Ctrl", "Meta" => "⌘", "Alt" => "Alt", "Shift" => "Shift",
        "Escape" => "Esc", "ArrowUp" => "↑", "ArrowDown" => "↓", "ArrowLeft" => "←", "ArrowRight" => "→"
      }.freeze

      # Text arrows are too faint at keycap size, so arrow keys show the icon set's own arrows.
      KEY_ICONS = {"ArrowUp" => "arrow-up", "ArrowDown" => "arrow-down", "ArrowLeft" => "arrow-left", "ArrowRight" => "arrow-right"}.freeze

      #   <%= uniform_kbd "Mod+Enter" %>
      def uniform_kbd(keys)
        caps = keys.split("+").map(&:strip).map do |part|
          label = KEY_ICONS[part] ? uniform_icon(KEY_ICONS[part]) : KEY_LABELS.fetch(part) { (part.length == 1) ? part.upcase : part }
          tag.kbd(label, class: "u-kbd")
        end
        tag.kbd(safe_join(caps), class: "u-kbd-group", data: {u_keys: keys}, aria: {hidden: true})
      end

      #   <%= uniform_tooltip "Edit" do %><%= link_to … %><% end %>
      def uniform_tooltip(label, **attributes, &)
        classes = ["u-tooltip", attributes.delete(:class)].compact
        tag.span(class: classes, **attributes) { capture(&) + tag.span(label, aria: {hidden: true}) }
      end

      # The person colour (1 to 8) for a name, the same in uniform.js, so a person keeps their colour everywhere.
      #   <span class="u-avatar" data-person-color="<%= uniform_person_color(user.full_name) %>">JM</span>
      def uniform_person_color(name)
        hash = name.codepoints.reduce(2166136261) { |sum, point| ((sum ^ point) * 16777619) & 0xffffffff }
        (hash % 8) + 1
      end

      #   <%= uniform_avatar user.full_name, size: :sm %>
      def uniform_avatar(name, size: nil, **attributes)
        classes = ["u-avatar", ("u-avatar-#{size}" if size), attributes.delete(:class)].compact
        tag.span(people_initials(name.to_s), class: classes, data: {person_color: uniform_person_color(name.to_s)},
          aria: {hidden: true}, **attributes)
      end

      #   <%= uniform_people job.assignees.map(&:full_name), empty: t(".unassigned") %>
      def uniform_people(names, empty:)
        return tag.span(empty, class: "u-people u-people-empty") if names.empty?

        faces = names.first(3).map { |name| tag.span(people_initials(name), data: {person_color: uniform_person_color(name)}) }
        avatars = tag.span(safe_join(faces), class: "u-avatar-group", aria: {hidden: true})
        shown = names.first(2).map { |name| people_short_name(name) }.join(", ")
        shown += " +#{names.size - 2}" if names.size > 2
        tag.span(class: "u-people") do
          safe_join([avatars, tag.span(shown, aria: {hidden: true}), tag.span(names.to_sentence, class: "sr-only")])
        end
      end

      #   <%= uniform_row_hint row: {label: t(".quick_edit"), number: "#916", keys: "e"},
      #         first: {label: t(".open_job"), number: "#916", keys: "o"} %>
      def uniform_row_hint(row:, first: nil)
        labels = [row_hint_label(row, "row")]
        labels << row_hint_label(first, "first") if first
        content_tag("u-row-hint", safe_join(labels), popover: "manual", aria: {hidden: true})
      end

      #   <%= uniform_chart :bar, label: t(".caption"), height: 160, rows: jobs_per_week.map { |week, count| {label: l(week, format: :short), value: count} } %>
      def uniform_chart(type = :bar, label:, rows:, series: nil, empty: nil, error: nil, **attributes)
        data = {rows: rows.map { |row| uniform_chart_row(row) }, series: series}.compact
        data_attributes = {label: label, empty: empty, error: error}.compact.merge(attributes.delete(:data) || {})
        content_tag("u-chart", type: type, data: data_attributes, **attributes) do
          safe_join([
            uniform_chart_shimmer(type.to_s, attributes[:height]),
            tag.script(ERB::Util.json_escape(data.to_json).html_safe, type: "application/json")
          ])
        end
      end

      private

      def people_initials(name)
        name.split.first(2).map { |part| part[0].upcase }.join
      end

      def people_short_name(name)
        first, *rest = name.split
        rest.empty? ? first : "#{first} #{rest.first[0]}"
      end

      def row_hint_label(label, part)
        number = (tag.span(label[:number], class: "u-data") if label[:number])
        keys = (uniform_kbd(label[:keys]) if label[:keys])
        tag.span(safe_join([label[:label], number, keys].compact, " "), data: {u_hint: part})
      end

      CHART_SHIMMER_BARS = [45, 60, 40, 70, 55, 80, 65, 50, 75, 60, 85, 70].freeze
      CHART_SHIMMER_LEGEND = ["96px", "120px", "80px", "136px"].freeze
      CHART_SHIMMER_LINE = "M0 92 C15 86 25 80 40 66 C55 52 65 50 80 34 C88 26 94 22 100 18 L100 100 L0 100 Z"

      def uniform_chart_row(row)
        values = row.key?(:values) ? row[:values] : [row[:value]]
        {label: row.fetch(:label).to_s, values: values, tone: row[:tone]}.compact
      end

      def uniform_chart_shimmer(type, height)
        shimmer = ->(width) { tag.span(class: "u-shimmer", style: "width: #{width}") }
        options = {data: {chart: ""}, aria: {hidden: true}}
        case type
        when "stacked"
          tag.div(class: "u-chart-stacked", **options) do
            tag.div(shimmer.call("100%"), class: "u-chart-stack") +
              tag.ul(safe_join(CHART_SHIMMER_LEGEND.map { |width| tag.li(shimmer.call(width)) }), class: "u-chart-legend")
          end
        when "meter"
          tag.div(shimmer.call("100%"), class: "u-chart-meter-loading", **options)
        when "spark"
          tag.div(shimmer.call("100%"), class: "u-chart-spark", **options)
        else
          style = ("--u-chart-height: #{height.to_i}px" if height)
          classes = ["u-chart-loading", ("u-chart-loading-line" if type == "line")]
          tag.div(class: classes, style: style, **options) do
            if type == "line"
              tag.svg(tag.path(d: CHART_SHIMMER_LINE), viewBox: "0 0 100 100", preserveAspectRatio: "none")
            else
              safe_join(CHART_SHIMMER_BARS.map { |at| tag.span(style: "--u-chart-at: #{at}%") })
            end
          end
        end
      end
    end
  end
end
