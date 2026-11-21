require "test_helper"
require "action_view"
require "studio/uniform/helper"

module Studio
  module Uniform
    class HelperTest < Minitest::Test
      def test_uniform_icon_inlines_the_svg_hidden_from_screen_readers
        html = view.uniform_icon("house", small: true)

        assert_predicate html, :html_safe?
        assert_match(/\A<svg class="u-icon u-icon-sm" aria-hidden="true" /, html)
      end

      def test_uniform_icon_refuses_a_path_outside_the_icons
        assert_raises(Errno::ENOENT) { view.uniform_icon("../tokens") }
      end

      def test_uniform_chart_carries_its_rows_as_json_and_a_shimmer_until_drawn
        html = view.uniform_chart(:bar, label: "New jobs each day", height: 160, whole: true, empty: "No jobs yet.",
          rows: [{label: "Mon 26", value: 0}, {label: "Wed 18", value: 2}])

        assert_match(%r{\A<u-chart type="bar" data-label="New jobs each day" data-empty="No jobs yet." height="160" whole="true">}, html)
        assert_match(%r{<div class="u-chart-loading" style="--u-chart-height: 160px" data-chart="" aria-hidden="true">}, html)
        json = html[%r{<script type="application/json">(.*)</script>}m, 1]
        assert_equal({"rows" => [{"label" => "Mon 26", "values" => [0]}, {"label" => "Wed 18", "values" => [2]}]}, JSON.parse(json))
      end

      def test_uniform_chart_escapes_labels_that_would_close_the_script
        html = view.uniform_chart(:stacked, label: "Open jobs", rows: [{label: "</script><b>", value: 1, tone: "danger"}])

        refute_includes html, "</script><b>"
        assert_equal "</script><b>", JSON.parse(html[%r{<script type="application/json">(.*)</script>}m, 1])["rows"][0]["label"]
      end

      def test_uniform_kbd_shows_each_key_and_keeps_the_hotkey_for_the_mac_swap
        html = view.uniform_kbd("Mod+Enter")

        assert_equal '<kbd class="u-kbd-group" data-u-keys="Mod+Enter" aria-hidden="true">' \
          '<kbd class="u-kbd">Ctrl</kbd><kbd class="u-kbd">Enter</kbd></kbd>', html
      end

      def test_uniform_row_hint_writes_a_closed_popover_with_a_label_for_the_row_and_the_first_cell
        html = view.uniform_row_hint(row: {label: "Quick edit", number: "#916", keys: "e"}, first: {label: "Open job", keys: "o"})

        assert_includes html, '<u-row-hint popover="manual" aria-hidden="true">'
        assert_includes html, '<span data-u-hint="row">Quick edit <span class="u-data">#916</span> <kbd class="u-kbd-group" data-u-keys="e"'
        assert_includes html, '<span data-u-hint="first">Open job <kbd class="u-kbd-group" data-u-keys="o"'
      end

      def test_uniform_row_hint_leaves_out_the_first_cell_label_when_there_is_none
        refute_includes view.uniform_row_hint(row: {label: "Edit"}), 'data-u-hint="first"'
      end

      def test_uniform_people_shows_three_avatars_two_short_names_and_the_rest_as_a_count
        html = view.uniform_people(["John Manager", "Sarah Owner", "Virgen Paucek", "Dexter Little"], empty: "Unassigned")

        assert_equal 3, html.scan(/<span data-person-color="[1-8]">[A-Z]{2}<\/span>/).size
        assert_includes html, '<span aria-hidden="true">John M, Sarah O +2</span>'
        assert_includes html, '<span class="sr-only">John Manager, Sarah Owner, Virgen Paucek, and Dexter Little</span>'
      end

      def test_uniform_tooltip_wraps_the_control_and_adds_a_hidden_label
        html = view.uniform_tooltip("Edit photos", class: "flex") { view.tag.a("Photos", href: "#") }

        assert_equal '<span class="u-tooltip flex"><a href="#">Photos</a><span aria-hidden="true">Edit photos</span></span>', html
      end

      def test_uniform_person_color_gives_a_name_the_same_colour_every_time
        assert_equal view.uniform_person_color("John Manager"), view.uniform_person_color("John Manager")
        assert_includes 1..8, view.uniform_person_color("Zoë Ågren")
      end

      def test_uniform_avatar_shows_initials_in_the_person_colour
        color = view.uniform_person_color("John Manager")

        assert_equal %(<span class="u-avatar u-avatar-sm" data-person-color="#{color}" aria-hidden="true">JM</span>),
          view.uniform_avatar("John Manager", size: :sm)
      end

      def test_uniform_avatar_adds_classes_after_its_own
        assert_includes view.uniform_avatar("Sarah Owner", class: "self-center"), 'class="u-avatar self-center"'
      end

      def test_uniform_people_says_the_empty_label_when_nobody_is_picked
        assert_equal '<span class="u-people u-people-empty">Unassigned</span>', view.uniform_people([], empty: "Unassigned")
      end

      def test_uniform_kbd_capitalizes_a_letter
        assert_includes view.uniform_kbd("e"), '<kbd class="u-kbd">E</kbd>'
      end

      private

      def view
        ActionView::Base.empty.extend(Helper)
      end
    end
  end
end
