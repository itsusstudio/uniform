require "test_helper"

module Studio
  class UniformTest < Minitest::Test
    def test_manifest_lists_the_imports_of_uniform_css_in_order
      css = Uniform.assets_path.join("uniform/uniform.css").read
      imported = css.scan(/^@import url\("([^"]+)"\);$/).flatten

      assert_equal imported, Uniform.manifest.fetch("stylesheets")
    end

    def test_every_file_in_the_manifest_exists
      files = Uniform.manifest.fetch("stylesheets") + [Uniform.manifest.fetch("script")]
      missing = files.reject { |file| Uniform.assets_path.join("uniform", file).exist? }

      assert_empty missing
    end

    def test_stylesheets_are_logical_asset_paths
      assert_equal "uniform/layers.css", Uniform.stylesheets.first
    end
  end
end
