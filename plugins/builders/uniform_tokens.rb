class Builders::UniformTokens < SiteBuilder
  BLOCKS = {
    theme: /^@theme static \{(.*?)^\}/m,
    root: /^:root \{(.*?)^\}/m,
    consumer: /^\[data-u-audience="consumer"\] \{(.*?)^\}/m,
    tablet: /--breakpoint-lg\)\) \{\s*:root \{(.*?)\}/m,
    phone: /--breakpoint-sm\)\) \{\s*:root \{(.*?)\}/m,
    dark: /^:root\[data-u-theme="dark"\] \{(.*?)^\}/m
  }.freeze

  def build
    helper(:uniform_tokens) { tokens }
  end

  private

  def tokens
    css = File.read(File.join(Studio::Uniform.assets_path, "uniform/theme.css"))
    BLOCKS.transform_values { |pattern| declarations(css[pattern, 1]) }
  end

  def declarations(block)
    block.to_s.scan(/(--[a-z0-9-]+)\s*:\s*([^;]+);/).to_h { |name, value| [name, value.strip.gsub(/\s+/, " ")] }
  end
end
