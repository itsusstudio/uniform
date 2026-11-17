require "test_helper"

module Studio
  module Uniform
    class MailTest < Minitest::Test
      def test_html_escapes_text_and_links_urls
        html = Mail::Html.paragraph("Tom & Jerry, see https://example.com/a")

        assert_includes html, "Tom &amp; Jerry"
        assert_includes html, %(<a href="https://example.com/a")
      end

      def test_text_blocks_are_plain
        assert_equal "Your code\n", Mail::Text.heading("Your code")
        assert_equal "Open:\nhttps://example.com\n", Mail::Text.button("Open", "https://example.com")
      end

      def test_a_long_fallback_link_wraps_instead_of_widening_the_mail
        assert_includes Mail::Html.notes(Mail::Html.fallback("Paste:", "https://example.com/#{"x" * 200}")), "word-break: break-all"
      end

      def test_fallback_link_only_shows_in_html
        assert_includes Mail::Html.notes(Mail::Html.fallback("Paste:", "https://example.com")), "https://example.com"
        assert_equal "Works for 7 days.\n", Mail::Text.notes(Mail::Text.fallback("Paste:", "https://example.com"), "Works for 7 days.")
      end

      def test_footer_names_the_product_and_where_it_is_made
        labels = {made_in: "Made in Montréal"}
        html = Mail::Html.layout("<p>Hi</p>", title: "Hi", preheader: "Hi", sender: "Workbench", address: ["Studio"], labels: labels)
        text = Mail::Text.layout("Hi", title: "Hi", preheader: "Hi", sender: "Workbench", address: ["Studio"], labels: labels)

        assert_includes html, "Workbench, Made in Montréal"
        assert_includes text, "Workbench, Made in Montréal\n\nStudio"
      end

      def test_footer_address_does_not_become_a_map_link
        html = Mail::Html.layout("<p>Hi</p>", title: "Hi", preheader: "Hi", sender: "Workbench", address: ["it's us studio", "216-4035 rue Saint-Ambroise"])

        assert_includes html, "it&#39;s us studio"
        assert_includes html, "2&zwnj;1&zwnj;6-4&zwnj;0&zwnj;3&zwnj;5 rue Saint-Ambroise"
      end

      def test_only_the_product_name_is_set_as_a_wordmark
        own = Mail::Html.layout("<p>Hi</p>", title: "Hi", preheader: "Hi", sender: "Workbench", address: ["Studio"])
        shop = Mail::Html.layout("<p>Hi</p>", title: "Hi", preheader: "Hi", sender: "Shop", address: ["Shop"], labels: {powered_by: "Powered by %{name}"}, sent_with: "Workbench", sent_with_url: "https://useworkbench.co")

        assert_includes own, "#{Mail::WORDMARK} color: #{Mail::INK};\">Workbench</td>"
        refute_includes shop, "Instrument Serif"
      end

      def test_layout_loads_brand_fonts_only_when_given
        bare = Mail::Html.layout("<p>Hi</p>", title: "Hi", preheader: "Hi", sender: "Workbench", address: ["Studio"])
        loaded = Mail::Html.layout("<p>Hi</p>", title: "Hi", preheader: "Hi", sender: "Workbench", address: ["Studio"], fonts: {"Inter-Regular.woff2" => "https://cdn.example/Inter-Regular-abc.woff2"})

        refute_includes bare, "@font-face"
        assert_includes loaded, %(@font-face { font-family: "Inter"; src: url("https://cdn.example/Inter-Regular-abc.woff2"))
      end

      def test_layout_shows_footer_links_only_when_given
        labels = {terms: "Terms", privacy: "Privacy", unsubscribe: "Unsubscribe", powered_by: "Powered by %{name}"}
        bare = Mail::Html.layout("<p>Hi</p>", title: "Hi", preheader: "Hi", sender: "Shop", address: ["Shop", "1 Main St", "Toronto"], labels: labels)
        full = Mail::Text.layout("Hi", title: "Hi", preheader: "Hi", sender: "Shop", address: ["Shop"], labels: labels, sent_with: "Workbench", sent_with_url: "https://useworkbench.co")

        refute_includes bare, "Unsubscribe"
        assert_includes full, "Powered by Workbench: https://useworkbench.co"
      end
    end
  end
end
