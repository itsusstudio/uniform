module Studio
  module Uniform
    module Helper
      def uniform_stylesheet_tags(**options)
        stylesheet_link_tag(*Uniform.stylesheets, **options)
      end

      def uniform_icon(name, small: false)
        classes = small ? "u-icon u-icon-sm" : "u-icon"
        Uniform.icon(name).sub("<svg", %(<svg class="#{classes}" aria-hidden="true")).html_safe
      end

      def uniform_mail
        Mail.for(formats.first)
      end

      # Only clients that load remote fonts (Apple Mail, iOS) use these, and only
      # with an absolute URL, so they need action_mailer.asset_host.
      def uniform_mail_fonts
        Mail::FONTS.to_h { |_, _, file| [file, asset_url("uniform/fonts/#{file}")] }.select { |_, url| url.start_with?("http") }
      end

      def uniform_form_with(**options, &)
        form_with(**options, builder: FormBuilder, class: ["u-form", options[:class]].compact.join(" "), &)
      end
    end
  end
end
