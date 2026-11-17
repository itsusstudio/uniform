require "erb"
require "active_support/core_ext/string/output_safety"

module Studio
  module Uniform
    module Mail
      INK = "#1a1a18"
      MUTED = "#6b6964"
      LINE = "#e7e7e3"
      INPUT = "#8c8981"
      LINK = "#2449b0"
      PAPER = "#f5f4ef"
      SANS = "font-family: Switzer, 'Helvetica Neue', Helvetica, Arial, sans-serif;"
      HEADLINE = "font-family: 'Apfel Grotezk', Switzer, 'Helvetica Neue', Helvetica, Arial, sans-serif;"
      WORDMARK = "font-family: 'Instrument Serif', Georgia, serif; font-size: 24px; line-height: 28px; font-style: italic; font-weight: 400; letter-spacing: -0.005em;"
      MONO = "font-family: 'IBM Plex Mono', Menlo, Consolas, monospace;"
      FONTS = [
        ["Switzer", 400, "Switzer-Regular.woff2"],
        ["Switzer", 500, "Switzer-Medium.woff2"],
        ["Apfel Grotezk", 500, "ApfelGrotezk-Mittel.woff2"],
        ["Instrument Serif", 400, "InstrumentSerif-Italic.woff2", "italic"],
        ["IBM Plex Mono", 400, "IBMPlexMono-Regular.woff2"]
      ]
      TEXT = "#{SANS} font-size: 16px; line-height: 24px;"
      TONES = {success: "#277a4d", warning: "#f3c22c", info: "#2f5bd3", danger: "#c03a26", neutral: "#8c8981"}

      Fallback = Struct.new(:text, :url)

      class << self
        def for(format)
          (format.to_s == "text") ? Text : Html
        end

        def safe(string)
          string.respond_to?(:html_safe) ? string.html_safe : string
        end

        def safe?(value)
          value.respond_to?(:html_safe?) && value.html_safe?
        end
      end

      module Html
        class << self
          def layout(content, title:, preheader:, sender:, address:, labels: {}, terms_url: nil, privacy_url: nil, unsubscribe_url: nil, sent_with: nil, sent_with_url: nil, fonts: {})
            name, street, *city = Array(address)
            link = "color: #{MUTED}; text-decoration: underline;"
            footer = [
              labels[:made_in] && %(<p style="margin: 0 0 16px; color: #{INK};">#{h(sender)}, #{h(labels[:made_in])}</p>),
              %(<p style="margin: 0;">#{[name, street, (city.join(", ") if city.any?)].compact.map { |line| undetected(line) }.join("<br>")}</p>),
              terms_url && %(<p style="margin: 16px 0 0;"><a href="#{h(terms_url)}" style="#{link}">#{h(labels.fetch(:terms))}</a>&nbsp;&nbsp;<a href="#{h(privacy_url)}" style="#{link}">#{h(labels.fetch(:privacy))}</a></p>),
              unsubscribe_url && %(<p style="margin: 16px 0 0;"><a href="#{h(unsubscribe_url)}" style="#{link}">#{h(labels.fetch(:unsubscribe))}</a></p>),
              sent_with && %(<p style="margin: 16px 0 0;">#{h(labels.fetch(:powered_by)).sub("%{name}", %(<a href="#{h(sent_with_url)}" style="#{link}">#{h(sent_with)}</a>))}</p>)
            ].select { |line| line.is_a?(String) }.join("\n            ")
            # Only the product's own name is a wordmark; a shop sending through it is set in the headline face.
            masthead = sent_with ? "#{HEADLINE} font-size: 18px; line-height: 24px; font-weight: 500;" : WORDMARK
            faces = FONTS.filter_map { |family, weight, file, style = "normal"|
              url = fonts[file] and %(@font-face { font-family: "#{family}"; src: url("#{h(url)}") format("woff2"); font-weight: #{weight}; font-style: #{style}; }\n  )
            }.join
            Mail.safe(<<~HTML)
              <!doctype html>
              <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
              <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="x-apple-disable-message-reformatting">
              <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
              <meta name="color-scheme" content="light">
              <meta name="supported-color-schemes" content="light">
              <title>#{h(title)}</title>
              <!--[if mso]>
              <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
              <![endif]-->
              <style>
                #{faces}:root { color-scheme: light; supported-color-schemes: light; }
                body { margin: 0; padding: 0; width: 100%; }
                a { color: #{LINK}; }
                a[x-apple-data-detectors], u + #body a, #MessageViewBody a { color: inherit !important; text-decoration: none !important; }
                @media (max-width: 599px) {
                  .u-mail-outer { padding: 0 !important; }
                  .u-mail-pad { padding-left: 24px !important; padding-right: 24px !important; }
                }
              </style>
              </head>
              <body id="body" style="margin: 0; padding: 0; width: 100%; background-color: #ffffff;">
              <div style="display: none; max-height: 0; max-width: 0; overflow: hidden; opacity: 0; mso-hide: all; font-size: 1px; line-height: 1px; color: #ffffff;">#{h(preheader)}#{"&#8199;&#65279;&#847;" * 8}</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="width: 100%; background-color: #ffffff;">
                <tr>
                  <td class="u-mail-outer" align="center" style="padding: 24px 16px;">
                    <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
                    <table role="presentation" class="u-mail-card" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="width: 100%; max-width: 600px; background-color: #ffffff;">
                      <tr>
                        <td class="u-mail-pad" style="padding: 24px 48px 0; #{masthead} color: #{INK};">#{h(sender)}</td>
                      </tr>
                      <tr>
                        <td class="u-mail-pad" style="padding: 48px 48px 48px; #{TEXT} color: #{INK};">
              #{content.to_s.strip}
                        </td>
                      </tr>
                    </table>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 600px;">
                      <tr>
                        <td class="u-mail-pad" style="padding: 0 48px 48px; #{SANS} font-size: 14px; line-height: 20px; color: #{MUTED};">
                          #{footer}
                        </td>
                      </tr>
                    </table>
                    <!--[if mso]></td></tr></table><![endif]-->
                  </td>
                </tr>
              </table>
              </body>
              </html>
            HTML
          end

          def heading(text)
            Mail.safe(%(<h1 style="margin: 0 0 24px; #{HEADLINE} font-size: 24px; line-height: 32px; font-weight: 500; color: #{INK};">#{inline(text)}</h1>\n))
          end

          def paragraph(text)
            Mail.safe(%(<p style="margin: 0 0 24px; #{TEXT} color: #{INK};">#{inline(text)}</p>\n))
          end

          def notes(*texts)
            Mail.safe(texts.flatten.each_with_index.map { |text, index|
              text = Mail.safe(%(#{h(text.text)} <a href="#{h(text.url)}" style="color: #{INK}; word-break: break-all;">#{h(text.url)}</a>)) if text.is_a?(Fallback)
              %(<p style="margin: #{index.zero? ? "48px" : "24px"} 0 0; #{TEXT} color: #{INK};">#{inline(text)}</p>\n)
            }.join)
          end

          def fallback(text, url) = Fallback.new(text, url)

          def rows(rows)
            lines = rows.each_with_index.map do |(label, value, kind), index|
              border = "border-top: 1px solid #{LINE};" + ((index == rows.size - 1) ? " border-bottom: 1px solid #{LINE};" : "")
              shown = inline(value)
              shown = %(<span style="#{MONO}">#{shown}</span>) if kind == :mono
              shown = %(<span style="display: inline-block; width: 8px; height: 8px; margin-right: 8px; background-color: #{TONES.fetch(kind)}; vertical-align: middle;"></span>#{shown}) if TONES.key?(kind)
              <<~ROW
                <tr>
                  <td width="96" valign="top" style="width: 96px; padding: 16px 16px 16px 0; #{border} #{TEXT} color: #{MUTED};">#{h(label)}</td>
                  <td valign="top" style="padding: 16px 0; #{border} #{TEXT} color: #{INK};">#{shown}</td>
                </tr>
              ROW
            end
            Mail.safe(%(<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%;">\n#{lines.join}  <tr>\n    <td colspan="2" height="48" style="height: 48px; font-size: 0; line-height: 0;">&nbsp;</td>\n  </tr>\n</table>\n))
          end

          def button(label, url)
            Mail.safe(<<~HTML)
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="#{INK}" style="background-color: #{INK}; border-radius: 999px;">
                    <a href="#{h(url)}" style="display: inline-block; padding: 10px 24px; #{TEXT} font-weight: 500; color: #{PAPER}; text-decoration: none; border-radius: 999px;">#{h(label)}</a>
                  </td>
                </tr>
              </table>
            HTML
          end

          def code(digits)
            Mail.safe(<<~HTML)
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 24px;">
                <tr>
                  <td style="padding: 12px 20px 12px 24px; border: 1px solid #{INPUT}; border-radius: 8px; #{MONO} font-size: 32px; line-height: 40px; font-weight: 400; letter-spacing: 4px; color: #{INK}; -webkit-user-select: all; user-select: all;">#{h(digits)}</td>
                </tr>
              </table>
            HTML
          end

          def table(columns, rows, total: nil)
            cell = "#{TEXT} color: #{INK};"
            head = columns.each_with_index.map { |column, index|
              align = index.zero? ? "left" : "right"
              pad = index.zero? ? "16px 16px 16px 0" : "16px 0"
              %(<th scope="col" align="#{align}" style="padding: #{pad}; border-bottom: 1px solid #{INK}; #{TEXT} font-weight: 500; color: #{MUTED}; text-align: #{align};">#{h(column)}</th>)
            }.join("\n      ")
            body = (rows + (total ? [total] : [])).each_with_index.map { |(item, amount), index|
              border = index.zero? ? "" : " border-top: 1px solid #{LINE};"
              strong = (total && index == rows.size) ? " font-weight: 500;" : ""
              <<~ROW
                <tr>
                  <td style="padding: 16px 16px 16px 0;#{border} #{cell}#{strong}">#{inline(item)}</td>
                  <td align="right" style="padding: 16px 0;#{border} #{MONO} font-size: 16px; line-height: 24px;#{strong} color: #{INK}; text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums;">#{h(amount)}</td>
                </tr>
              ROW
            }.join
            Mail.safe(%(<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse; page-break-inside: avoid;">\n  <thead>\n    <tr>\n      #{head}\n    </tr>\n  </thead>\n  <tbody>\n#{body}  </tbody>\n</table>\n))
          end

          def facts(rows)
            body = rows.each_with_index.map { |(label, value, kind), index|
              border = index.zero? ? "" : " border-top: 1px solid #{LINE};"
              font = (kind == :mono) ? "#{MONO} font-size: 16px; line-height: 24px;" : TEXT
              <<~ROW
                <tr>
                  <th scope="row" align="left" style="padding: 16px 16px 16px 0;#{border} #{TEXT} font-weight: normal; color: #{MUTED}; text-align: left; white-space: nowrap;">#{h(label)}</th>
                  <td align="right" style="padding: 16px 0;#{border} #{font} color: #{INK}; text-align: right;">#{inline(value)}</td>
                </tr>
              ROW
            }.join
            Mail.safe(%(<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; margin: 48px 0 0; border-collapse: collapse; page-break-inside: avoid;">\n  <tbody>\n#{body}  </tbody>\n</table>\n))
          end

          def mono(text)
            Mail.safe(%(<span style="#{MONO} white-space: nowrap;">#{h(text)}</span>))
          end

          private

          # Gmail turns street numbers and postcodes into blue map links and ignores
          # format-detection; a zero-width non-joiner between digits stops the match.
          def undetected(text)
            h(text).gsub(/&#?\w+;|(\d)(?=\d)/) { $1 ? "#{$1}&zwnj;" : $& }
          end

          def h(value)
            Mail.safe?(value) ? value.to_s : ERB::Util.html_escape(value.to_s)
          end

          def inline(text)
            return text.to_s if Mail.safe?(text)
            h(text).gsub(%r{https://[^\s<]+}) { |url| %(<a href="#{url}" style="color: #{LINK}; text-decoration: underline;">#{url}</a>) }
          end
        end
      end

      module Text
        class << self
          def layout(content, title:, preheader:, sender:, address:, labels: {}, terms_url: nil, privacy_url: nil, unsubscribe_url: nil, sent_with: nil, sent_with_url: nil, fonts: {})
            name, street, *city = Array(address)
            lines = [sender, "", content.to_s.strip, "", "--"]
            lines += ["#{sender}, #{labels[:made_in]}", ""] if labels[:made_in]
            lines += [name, street, (city.join(", ") if city.any?)]
            lines += ["", "#{labels.fetch(:terms)}: #{terms_url}", "#{labels.fetch(:privacy)}: #{privacy_url}"] if terms_url
            lines += ["", "#{labels.fetch(:unsubscribe)}: #{unsubscribe_url}"] if unsubscribe_url
            lines += ["", "#{labels.fetch(:powered_by).sub("%{name}", sent_with)}: #{sent_with_url}"] if sent_with
            Mail.safe(lines.compact.join("\n") + "\n")
          end

          def heading(text) = block(plain(text))

          def paragraph(text) = block(plain(text))

          def notes(*texts) = Mail.safe(texts.flatten.grep_v(Fallback).map { |text| plain(text) }.join("\n\n") + "\n")

          def fallback(text, url) = Fallback.new(text, url)

          def rows(rows)
            width = rows.map { |row| row[0].to_s.size }.max + 2
            block(rows.map { |label, value| "#{"#{label}:".ljust(width)} #{plain(value)}" }.join("\n"))
          end

          def facts(rows) = rows(rows)

          def button(label, url) = block("#{label}:\n#{url}")

          def code(digits) = block(digits.to_s)

          def table(columns, rows, total: nil)
            all = [columns] + rows + (total ? [total] : [])
            left = all.map { |row| plain(row[0]).size }.max
            right = all.map { |row| row[1].to_s.size }.max
            width = left + right + 4
            line = "-" * width
            format = ->(row) { plain(row[0]).ljust(width - right) + row[1].to_s.rjust(right) }
            out = [format.(columns), line] + rows.map(&format)
            out += [line, format.(total)] if total
            block(out.join("\n"))
          end

          def mono(text) = Mail.safe(text.to_s)

          private

          def block(text) = Mail.safe("#{text}\n")

          def plain(text) = text.to_s.gsub(/<[^>]+>/, "")
        end
      end
    end
  end
end
