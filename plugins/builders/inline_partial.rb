class Builders::InlinePartial < SiteBuilder
  def build
    helper(:inline_partial) do |name, indent: 0, **locals|
      html = helpers.view.render(name, **locals).to_s.strip
      html = html.gsub("\n", "\n#{" " * indent}") if indent.positive?
      html.html_safe
    end

    helper(:inline_markdown) do |text|
      helpers.markdownify(text.to_s).to_s.strip.delete_prefix("<p>").delete_suffix("</p>").html_safe
    end

    helper(:variant_class) { |base, variant| "#{base} #{base}-#{variant}" }

    helper(:code_names) do |text|
      text.to_s.split(/(, | to )/).map { |part| part.match?(/\A(, | to )\z/) ? ERB::Util.h(part) : "<code>#{ERB::Util.h(part)}</code>" }.join.html_safe
    end
  end
end
