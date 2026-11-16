class Builders::CodeTabs < SiteBuilder
  PAIR = %r{(<div class="language-html highlighter-rouge"><div class="highlight"><pre class="highlight"><code>.*?</code></pre></div></div>)\s*(<div class="language-erb highlighter-rouge"><div class="highlight"><pre class="highlight"><code>.*?</code></pre></div></div>)}m

  def build
    hook :resources, :post_render do |resource|
      next unless resource.output&.include?("language-erb highlighter-rouge")

      index = -1
      resource.output = resource.output.gsub(PAIR) do
        index += 1
        tabs(Regexp.last_match(1), Regexp.last_match(2), index)
      end
    end
  end

  private

  def tabs(html, erb, index)
    name = "code-#{index}"
    %(<u-toggle-panels data-group="code">) +
      %(<fieldset class="u-fieldset" hidden><legend class="u-visually-hidden">Code for</legend><div class="u-toggle-group">) +
      %(<label><input type="radio" name="#{name}" value="html" checked> HTML</label>) +
      %(<label><input type="radio" name="#{name}" value="rails"> Rails</label></div></fieldset>) +
      %(<section data-value="html"><h3>HTML</h3>#{html}</section>) +
      %(<section data-value="rails"><h3>Rails</h3>#{erb}</section>) +
      %(</u-toggle-panels>)
  end
end
