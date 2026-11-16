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
          error = object&.errors&.where(method)&.first
          ids = {hint: "#{field_id(method)}-hint", error: "#{field_id(method)}-error"}
          described_by = [(ids[:hint] if hint), (ids[:error] if error)].compact

          options[:id] ||= field_id(method)
          options[:class] = ["u-input", options[:class]].compact.join(" ")
          options[:placeholder] ||= " "
          options[:aria] = (options[:aria] || {}).merge(invalid: (true if error), describedby: described_by.join(" ").presence).compact

          @template.tag.div(class: "u-field") do
            @template.safe_join([
              label(method, label_text, for: options[:id]),
              super(method, options),
              (@template.tag.small(hint, id: ids[:hint]) if hint),
              (@template.tag.p(error_message(error, messages), id: ids[:error], class: "u-error") if error)
            ].compact)
          end
        end
      end

      private

      def error_message(error, messages)
        messages.with_indifferent_access[error.type] || error.full_message
      end
    end
  end
end
