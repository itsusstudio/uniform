require "fileutils"

module Studio
  module Uniform
    module TailwindSource
      class << self
        def files
          Dir.glob("**/*.css", base: source).sort
        end

        def install(to)
          to = Pathname(to)
          FileUtils.rm_rf(to)
          files.each do |file|
            FileUtils.mkdir_p(to.join(file).dirname)
            FileUtils.cp(source.join(file), to.join(file))
          end
        end

        def current?(to)
          to = Pathname(to)
          Dir.glob("**/*.css", base: to).sort == files &&
            files.all? { |file| FileUtils.identical?(source.join(file), to.join(file)) }
        end

        private

        def source
          Uniform.assets_path.join("uniform")
        end
      end
    end
  end
end
