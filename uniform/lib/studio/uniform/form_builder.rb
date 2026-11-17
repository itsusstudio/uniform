require "action_view"

module Studio
  module Uniform
    # Writes Uniform's field markup: a u-field with its label, a u-input, an
    # optional hint, and the error with aria-invalid and aria-describedby set.
    #
    #   <%= uniform_form_with model: @shop do |form| %>
    #     <%= form.text_field :name, label: "Business name", hint: "On receipts." %>
    #   <% end %>
    #
    # The error is the attribute's first one, as a full sentence. Pass
    # messages: {blank: "Enter your business name."} to word it per error
    # type for this form only. Without label:, a field renders as Rails does.
    class FormBuilder < ActionView::Helpers::FormBuilder
      FIELDS = [
        :text_field, :email_field, :telephone_field, :password_field, :number_field,
        :url_field, :search_field, :date_field, :text_area
      ].freeze

      FIELDS.each do |helper|
        define_method(helper) do |method, options = {}|
          options = options.dup
          label_text = options.delete(:label)
          return super(method, options) if label_text.nil?

          hint = options.delete(:hint)
          messages = options.delete(:messages) || {}
          error = error_for(method)

          options[:id] ||= field_id(method)
          options[:class] = ["u-input", options[:class]].compact.join(" ")
          options[:placeholder] ||= " "
          options[:aria] = aria_for(method, options[:aria], hint:, error:)

          field_wrapper(method, label_text, options[:id], hint:, error:, messages:) { super(method, options) }
        end
      end

      #   <%= form.select :language, [["English", "en"], ["French", "fr"]], label: "Language" %>
      def select(method, choices = nil, options = {}, html_options = {}, &block)
        options = options.dup
        label_text = options.delete(:label)
        return super if label_text.nil?

        hint = options.delete(:hint)
        messages = options.delete(:messages) || {}
        error = error_for(method)

        html_options = html_options.dup
        html_options[:id] ||= field_id(method)
        html_options[:class] = ["u-input", html_options[:class]].compact.join(" ")
        html_options[:aria] = aria_for(method, html_options[:aria], hint:, error:)

        field_wrapper(method, label_text, html_options[:id], hint:, error:, messages:) { super(method, choices, options, html_options, &block) }
      end

      #   <%= form.check_box :texts_ok, label: "Okay to text", hint: "Only about this job." %>
      def check_box(method, options = {}, checked_value = "1", unchecked_value = "0")
        options = options.dup
        label_text = options.delete(:label)
        return super if label_text.nil?

        hint = options.delete(:hint)
        messages = options.delete(:messages) || {}
        error = error_for(method)
        options[:aria] = aria_for(method, options[:aria], hint:, error:)

        box = @template.tag.label(class: "u-checkbox") do
          @template.safe_join([
            super(method, options, checked_value, unchecked_value),
            label_text,
            (@template.tag.span(hint, id: field_ids(method)[:hint], class: "u-checkbox-hint") if hint)
          ].compact)
        end
        @template.safe_join([box, error_tag(method, error, messages)].compact)
      end

      # Each choice is [label, value] or [label, value, hint].
      #
      #   <%= form.radio_group :paid_by, [["Card", "card"], ["Cash", "cash"]], legend: "Paid by" %>
      def radio_group(method, choices, legend:, hint: nil, messages: {})
        error = error_for(method)
        ids = field_ids(method)

        @template.tag.fieldset(class: "u-fieldset", aria: {describedby: described_by(ids, hint:, error:)}.compact) do
          @template.safe_join([
            @template.tag.legend(legend),
            (@template.tag.small(hint, id: ids[:hint]) if hint),
            *choices.map { |label_text, value, choice_hint| radio_choice(method, label_text, value, choice_hint, error) },
            error_tag(method, error, messages)
          ].compact)
        end
      end

      private

      def radio_choice(method, label_text, value, choice_hint, error)
        @template.tag.label(class: "u-radio") do
          @template.safe_join([
            radio_button(method, value, aria: {invalid: (true if error)}.compact),
            label_text,
            (@template.tag.span(choice_hint, class: "u-radio-hint") if choice_hint)
          ].compact)
        end
      end

      def field_wrapper(method, label_text, input_id, hint:, error:, messages:)
        @template.tag.div(class: "u-field") do
          @template.safe_join([
            label(method, label_text, for: input_id),
            yield,
            (@template.tag.small(hint, id: field_ids(method)[:hint]) if hint),
            error_tag(method, error, messages)
          ].compact)
        end
      end

      def error_tag(method, error, messages)
        return if error.nil?

        @template.tag.p(error_message(error, messages), id: field_ids(method)[:error], class: "u-error")
      end

      def error_for(method)
        object&.errors&.where(method)&.first
      end

      def field_ids(method)
        {hint: "#{field_id(method)}-hint", error: "#{field_id(method)}-error"}
      end

      def described_by(ids, hint:, error:)
        [(ids[:hint] if hint), (ids[:error] if error)].compact.join(" ").presence
      end

      def aria_for(method, aria, hint:, error:)
        (aria || {}).merge(invalid: (true if error), describedby: described_by(field_ids(method), hint:, error:)).compact
      end

      def error_message(error, messages)
        messages.with_indifferent_access[error.type] || error.full_message
      end
    end
  end
end
