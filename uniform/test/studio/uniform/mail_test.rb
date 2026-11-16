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

      def test_fallback_link_only_shows_in_html
        assert_includes Mail::Html.notes(Mail::Html.fallback("Paste:", "https://example.com")), "https://example.com"
        assert_equal "Works for 7 days.\n", Mail::Text.notes(Mail::Text.fallback("Paste:", "https://example.com"), "Works for 7 days.")
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
