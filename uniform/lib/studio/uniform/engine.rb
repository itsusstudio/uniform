require "studio/uniform/helper"
require "studio/uniform/form_builder"

module Studio
  module Uniform
    class Engine < ::Rails::Engine
      initializer "studio_uniform.assets" do |app|
        app.config.assets.paths << Uniform.assets_path if app.config.respond_to?(:assets)
      end

      initializer "studio_uniform.importmap", before: "importmap.cache_sweeper" do |app|
        app.config.importmap.cache_sweepers << Uniform.assets_path.join("uniform") if app.config.respond_to?(:importmap)
      end

      initializer "studio_uniform.helper" do
        ActiveSupport.on_load(:action_view) { include Studio::Uniform::Helper }
      end

      # Rails wraps a field with errors in <div class="field_with_errors">,
      # which breaks u-field. Uniform marks errors with aria-invalid instead.
      initializer "studio_uniform.field_errors" do
        ActiveSupport.on_load(:action_view) { ActionView::Base.field_error_proc = proc { |html, _| html } }
      end
    end
  end
end
