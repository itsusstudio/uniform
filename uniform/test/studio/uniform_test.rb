require "test_helper"

module Studio
  class UniformTest < Minitest::Test
    def test_every_file_uniform_css_imports_exists
      css = Uniform.assets_path.join("uniform/uniform.css").read
      imported = css.scan(/^@import "([^"]+)";$/).flatten
      missing = imported.reject { |file| Uniform.assets_path.join("uniform", file).exist? }

      refute_empty imported
      assert_empty missing
    end

    def test_the_manifest_script_exists
      assert_predicate Uniform.assets_path.join("uniform", Uniform.manifest.fetch("script")), :exist?
    end
  end
end
