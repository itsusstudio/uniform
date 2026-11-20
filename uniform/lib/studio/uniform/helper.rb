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

      #   <%= uniform_kbd "Mod+Enter" %>
      def uniform_kbd(keys)
        labels = keys.split("+").map(&:strip).map { |part| KEY_LABELS.fetch(part) { (part.length == 1) ? part.upcase : part } }
        tag.kbd(safe_join(labels.map { |label| tag.kbd(label, class: "u-kbd") }), class: "u-kbd-group", data: {u_keys: keys}, aria: {hidden: true})
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
