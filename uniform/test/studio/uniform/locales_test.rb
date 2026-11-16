require "test_helper"
require "yaml"

module Studio
  module Uniform
    class LocalesTest < Minitest::Test
      LOCALES = ["en", "fr", "nl", "es"]

      def test_every_locale_has_the_same_keys_as_english
        english = keys("en")

        LOCALES.each do |locale|
          assert_equal english, keys(locale), "uniform.#{locale}.yml keys differ from English"
        end
      end

      private

      def keys(locale)
        flatten(YAML.load_file(Uniform.root.join("config/locales/uniform.#{locale}.yml")).fetch(locale)).sort
      end

      def flatten(hash, prefix = [])
        hash.flat_map { |key, value| value.is_a?(Hash) ? flatten(value, prefix + [key]) : [(prefix + [key]).join(".")] }
      end
    end
  end
end
