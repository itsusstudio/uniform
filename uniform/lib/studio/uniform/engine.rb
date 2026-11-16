require "studio/uniform/helper"

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
    end
  end
end
