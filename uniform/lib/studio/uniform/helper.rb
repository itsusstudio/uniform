module Studio
  module Uniform
    module Helper
      def uniform_stylesheet_tags(**options)
        stylesheet_link_tag(*Uniform.stylesheets, **options)
      end

      def uniform_mail
        Mail.for(formats.first)
      end

      def uniform_form_with(**options, &)
        form_with(**options, builder: FormBuilder, class: ["u-form", options[:class]].compact.join(" "), &)
      end
    end
  end
end
