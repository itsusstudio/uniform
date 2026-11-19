require "studio/uniform/tailwind_source"

namespace :uniform do
  desc "Copy Uniform's Tailwind source into app/assets/tailwind/uniform"
  task :install do
    Studio::Uniform::TailwindSource.install(Rails.root.join("app/assets/tailwind/uniform"))
    puts "Copied Uniform #{Studio::Uniform::VERSION} into app/assets/tailwind/uniform"
  end

  desc "Fail if app/assets/tailwind/uniform doesn't match the installed Uniform gem"
  task :verify do
    if !Studio::Uniform::TailwindSource.current?(Rails.root.join("app/assets/tailwind/uniform"))
      abort "app/assets/tailwind/uniform doesn't match Uniform #{Studio::Uniform::VERSION}. Run bin/rails uniform:install."
    end
  end
end
