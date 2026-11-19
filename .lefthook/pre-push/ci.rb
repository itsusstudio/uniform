#!/usr/bin/env ruby
# Apps take Uniform from main, so a push to main is a release: run bin/ci
# first. Feature branches are never gated, keeping WIP pushes unblocked.
#
# git feeds the pushed refs on stdin, one per line:
#   <local_ref> <local_sha> <remote_ref> <remote_sha>

repo_root = File.expand_path("../..", __dir__)
status = 0

$stdin.each_line do |line|
  _local_ref, local_sha, remote_ref, remote_sha = line.split
  next if remote_ref != "refs/heads/main"

  range = remote_sha =~ /[^0]/ ? "#{remote_sha}..#{local_sha}" : local_sha

  fixups = `git log #{range} -E --grep='^(fixup|squash|amend)!' --format='  %h %s'`
  if !fixups.strip.empty?
    puts "🚫 Push to main blocked — squash these autosquash commits first:"
    puts fixups
    puts "  git rebase -i --autosquash origin/main   (or push --no-verify)"
    exit 1
  end

  puts "🔍 Pushing to main — running CI"
  status = 1 if !system("cd #{repo_root} && mise x -- bin/ci")
end

exit status
