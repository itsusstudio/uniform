require "studio/uniform/helper"

module Studio
  module Uniform
    class Engine < ::Rails::Engine
      initializer "studio_uniform.assets" do |app|
        app.config.assets.paths << Uniform.assets_path if app.config.respond_to?(:assets)
      end

      initializer "studio_uniform.helper" do
        ActiveSupport.on_load(:action_view) { include Studio::Uniform::Helper }
      end
    end
  end
end
