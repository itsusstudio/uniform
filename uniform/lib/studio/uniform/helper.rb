module Studio
  module Uniform
    module Helper
      def uniform_stylesheet_tags(**options)
        stylesheet_link_tag(*Uniform.stylesheets, **options)
      end
    end
  end
end
