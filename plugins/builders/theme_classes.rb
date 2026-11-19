class Builders::ThemeClasses < SiteBuilder
  PREFIXES = {
    "background-color" => "bg-",
    "text-color" => "text-",
    "border-color" => "border-",
    "color" => "bg-"
  }.freeze

  def build
    classes = theme_classes
    helper(:theme_class) { |token| classes[token] }
  end

  private

  def theme_classes
    css = File.read(File.join(Studio::Uniform.assets_path, "uniform/theme.css"))
    namespaces = PREFIXES.keys.sort_by { -it.length }.join("|")
    css.scan(/^\s*--(#{namespaces})-([a-z0-9-]+):\s*var\((--u-[a-z0-9-]+)\);/).to_h do |namespace, name, token|
      [token, "#{PREFIXES.fetch(namespace)}#{name}"]
    end
  end
end
