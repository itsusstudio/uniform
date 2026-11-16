require_relative "lib/studio/uniform/version"

Gem::Specification.new do |spec|
  spec.name = "studio-uniform"
  spec.version = Studio::Uniform::VERSION
  spec.authors = ["ITSUSSTUDIO"]
  spec.email = ["hello@itsusstudio.com"]

  spec.summary = "Uniform, the studio design system: plain CSS, one small script, fonts, icons and mailer templates"
  spec.description = "A Rails engine that serves Uniform's stylesheets, script, fonts and icons through the asset " \
    "pipeline, with a helper that links the stylesheets in manifest order."
  spec.homepage = "https://github.com/itsusstudio/uniform"
  spec.license = "MIT"
  spec.required_ruby_version = ">= 3.4"

  spec.metadata["source_code_uri"] = spec.homepage

  spec.files = Dir["lib/**/*.rb", "app/**/*", "assets/**/*", "config/**/*", "README.md"]
  spec.require_paths = ["lib"]

  spec.add_dependency "activesupport", ">= 7.1"
end
