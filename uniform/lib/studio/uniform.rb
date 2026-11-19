require "json"
require "studio/uniform/version"
require "studio/uniform/studio"
require "studio/uniform/mail"

module Studio
  module Uniform
    class << self
      def root
        Pathname.new(File.expand_path("../..", __dir__))
      end

      def assets_path
        root.join("assets")
      end

      def icon(name)
        assets_path.join("uniform/icons/#{File.basename(name.to_s)}.svg").read
      end

      def manifest
        JSON.parse(assets_path.join("uniform/manifest.json").read)
      end
    end
  end
end

require "studio/uniform/engine" if defined?(Rails::Engine)
