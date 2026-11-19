require "test_helper"
require "tmpdir"
require "studio/uniform/tailwind_source"

module Studio
  module Uniform
    class TailwindSourceTest < Minitest::Test
      def test_install_copies_every_stylesheet_the_entry_file_imports
        Dir.mktmpdir do |dir|
          TailwindSource.install(dir)

          assert_path_exists File.join(dir, "tailwind.css")
          assert_path_exists File.join(dir, "components/button.css")
          assert TailwindSource.current?(dir)
        end
      end

      def test_install_removes_stylesheets_the_gem_no_longer_ships
        Dir.mktmpdir do |dir|
          File.write(File.join(dir, "retired.css"), "")

          TailwindSource.install(dir)

          refute_path_exists File.join(dir, "retired.css")
        end
      end

      def test_current_is_false_once_a_copied_stylesheet_drifts
        Dir.mktmpdir do |dir|
          TailwindSource.install(dir)
          File.write(File.join(dir, "theme.css"), "")

          refute TailwindSource.current?(dir)
        end
      end
    end
  end
end
