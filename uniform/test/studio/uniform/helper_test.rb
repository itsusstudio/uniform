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

      private

      def view
        ActionView::Base.empty.extend(Helper)
      end
    end
  end
end
