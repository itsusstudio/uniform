require "json"
require "studio/uniform/version"

module Studio
  module Uniform
    class << self
      def root
        Pathname.new(File.expand_path("../..", __dir__))
      end

      def assets_path
        root.join("assets")
      end

      def mailers_path
        root.join("mailers")
      end

      def manifest
        JSON.parse(assets_path.join("uniform/manifest.json").read)
      end

      def stylesheets
        manifest.fetch("stylesheets").map { |file| "uniform/#{file}" }
      end
    end
  end
end

require "studio/uniform/engine" if defined?(Rails::Engine)
