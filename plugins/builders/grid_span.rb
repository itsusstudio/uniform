class Builders::GridSpan < SiteBuilder
  SPANS = {
    4 => "@grid:col-span-4",
    5 => "@grid:col-span-5",
    6 => "@grid:col-span-6",
    8 => "@grid:col-span-8"
  }.freeze

  def build
    helper(:grid_span) { |columns| SPANS[columns] }
  end
end
