require "test_helper"
require "rails"
require "action_controller/railtie"
require "propshaft"
require "studio/uniform/engine"

module Studio
  module Uniform
    class EngineTest < Minitest::Test
      class Dummy < Rails::Application
        config.root = File.expand_path("../..", __dir__)
        config.eager_load = false
        config.logger = Logger.new(nil)
        config.secret_key_base = "test"
      end

      Dummy.initialize!

      def test_adds_the_assets_folder_to_the_asset_paths
        assert_includes Rails.application.config.assets.paths, Uniform.assets_path
      end

      def test_serves_uniform_css_by_its_logical_path
        assert Rails.application.assets.load_path.find("uniform/uniform.css")
      end

      def test_helper_links_every_stylesheet_in_manifest_order
        view = ActionView::Base.empty
        tags = view.uniform_stylesheet_tags

        assert_equal Uniform.stylesheets.size, tags.scan("<link").size
        assert_match %r{/assets/uniform/layers-\w+\.css}, tags
      end
    end
  end
end
