require "test_helper"
require "rails"
require "action_controller/railtie"
require "action_mailer/railtie"
require "tmpdir"
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

      VIEWS = Dir.mktmpdir
      FileUtils.mkdir_p(File.join(VIEWS, "test_mailer"))
      ["html", "text"].each do |format|
        File.write(File.join(VIEWS, "test_mailer", "code.#{format}.erb"), "<% u = uniform_mail -%>\n<%= u.heading \"Your code\" %>\n<%= u.code \"482915\" %>\n")
      end

      class TestMailer < ActionMailer::Base
        self.mailer_name = "test_mailer"
        layout "uniform/mailer"
        prepend_view_path VIEWS

        def code
          @uniform_mail = {sender: "Workbench", address: ["it's us studio", "216-4035 rue Saint-Ambroise", "Montréal QC"], wordmark_style: "serif", preheader: "Works for 10 minutes."}
          mail(to: "dana@example.com", from: "hello@example.com", subject: "482915 is your code")
        end
      end

      def test_adds_the_assets_folder_to_the_asset_paths
        assert_includes Rails.application.config.assets.paths, Uniform.assets_path
      end

      def test_serves_uniform_css_by_its_logical_path
        assert Rails.application.assets.load_path.find("uniform/uniform.css")
      end

      def test_loads_the_translations
        assert_equal "Fermer", I18n.t("uniform.close", locale: :fr)
        assert_equal "Quitar filtro: Estado", I18n.t("uniform.remove_filter", name: "Estado", locale: :es)
      end

      def test_mailer_renders_both_parts_in_the_uniform_layout
        message = TestMailer.code

        assert_includes message.html_part.body.to_s, "<title>482915 is your code</title>"
        assert_includes message.html_part.body.to_s, "482915</td>"
        assert_includes message.text_part.body.to_s, "Workbench\n\nYour code\n\n482915"
      end
    end
  end
end
