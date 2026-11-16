# Uniform

it's us studio's design system, and the site that documents it.

- `uniform/`: the `studio-uniform` gem. Plain CSS, one small script, fonts, icons, an email layout and email blocks, served to Rails apps through a small engine. See [uniform/README.md](uniform/README.md).
- Everything else: the Bridgetown docs site, which uses the gem the same way an app does.

## Install in an app

```ruby
gem "studio-uniform", github: "itsusstudio/uniform", glob: "uniform/*.gemspec"
```

## Working on it

```sh
bundle install && npm install
bin/bridgetown start
```

- Lint: `npm run lint:css`.
- Gem tests: `cd uniform && bundle install && bundle exec rake test`.
