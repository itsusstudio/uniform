require "test_helper"
require "action_view"
require "studio/uniform/form_builder"

module Studio
  module Uniform
    class FormBuilderTest < Minitest::Test
      Error = Struct.new(:type, :full_message)

      Errors = Struct.new(:list) do
        def where(_attribute) = list

        def [](_attribute) = list.map(&:full_message)
      end

      def setup
        ActionView::Base.field_error_proc = proc { |html, _| html }
      end

      Shop = Struct.new(:name, :errors)

      BLANK = Errors.new([Error.new(:blank, "Name can't be blank")])

      def test_a_labelled_field_gets_uniform_markup
        html = field(Shop.new("Kensington", Errors.new([])), :name, label: "Business name", hint: "On receipts.")

        assert_includes html, %(<div class="u-field">)
        assert_includes html, %(<label for="shop_name">Business name</label>)
        assert_match(/<input id="shop_name" class="u-input" placeholder=" " aria-describedby="shop_name-hint"/, html)
        assert_includes html, %(<small id="shop_name-hint">On receipts.</small>)
        refute_includes html, "aria-invalid"
      end

      def test_an_error_marks_the_input_and_says_what_to_fix
        shop = Shop.new(nil, BLANK)
        html = field(shop, :name, label: "Business name")

        assert_includes html, %(aria-invalid="true")
        assert_includes html, %(aria-describedby="shop_name-error")
        assert_includes html, %(<p id="shop_name-error" class="u-error">Name can&#39;t be blank</p>)
      end

      def test_a_form_can_word_an_error_in_its_own_voice
        shop = Shop.new(nil, BLANK)

        assert_includes field(shop, :name, label: "Business name", messages: {blank: "Enter your business name."}), "Enter your business name."
      end

      def test_without_a_label_a_field_renders_as_rails_does
        refute_includes field(Shop.new(nil, Errors.new([])), :name), "u-field"
      end

      def test_a_labelled_select_gets_uniform_markup_and_its_error
        html = builder(Shop.new(nil, BLANK)).select(:name, [["Kensington", "k"]], {label: "Shop", hint: "Pick one."})

        assert_includes html, %(<div class="u-field">)
        assert_includes html, %(<label for="shop_name">Shop</label>)
        assert_match(/<select id="shop_name" class="u-input" aria-invalid="true" aria-describedby="shop_name-hint shop_name-error"/, html)
        assert_includes html, %(<p id="shop_name-error" class="u-error">)
      end

      def test_a_labelled_check_box_sits_inside_its_label_with_the_hint
        html = builder(Shop.new("1", Errors.new([]))).check_box(:name, label: "Okay to text", hint: "Only about this job.")

        assert_match(%r{<label class="u-checkbox"><input name="shop\[name\]" type="hidden" value="0"}, html)
        assert_includes html, %(aria-describedby="shop_name-hint")
        assert_includes html, %(Okay to text<span id="shop_name-hint" class="u-checkbox-hint">Only about this job.</span></label>)
      end

      def test_a_radio_group_is_a_fieldset_of_uniform_radios
        html = builder(Shop.new("cash", BLANK)).radio_group(:name, [["Card", "card"], ["Cash", "cash", "Count it twice."]], legend: "Paid by")

        assert_includes html, %(<fieldset class="u-fieldset" aria-describedby="shop_name-error"><legend>Paid by</legend>)
        assert_match(/<label class="u-radio"><input aria-invalid="true" type="radio" value="cash" checked="checked"/, html)
        assert_includes html, %(<span class="u-radio-hint">Count it twice.</span>)
        assert_includes html, %(class="u-error")
      end

      def test_without_a_label_a_select_and_check_box_render_as_rails_does
        shop = Shop.new(nil, Errors.new([]))

        refute_includes builder(shop).select(:name, [["A", "a"]]), "u-field"
        refute_includes builder(shop).check_box(:name), "u-checkbox"
      end

      private

      def builder(shop)
        FormBuilder.new(:shop, shop, ActionView::Base.empty, {})
      end

      def field(shop, method, **options)
        FormBuilder.new(:shop, shop, ActionView::Base.empty, {}).text_field(method, **options)
      end
    end
  end
end
