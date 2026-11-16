module Studio
  module Uniform
    module Helper
      def uniform_stylesheet_tags(**options)
        stylesheet_link_tag(*Uniform.stylesheets, **options)
      end

      def uniform_mail
        Mail.for(formats.first)
      end
    end
  end
end
