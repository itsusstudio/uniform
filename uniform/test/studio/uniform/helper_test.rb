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

      private

      def view
        ActionView::Base.empty.extend(Helper)
      end
    end
  end
end
