module Web::Views::Items
  class Index
    include Web::View

    def item_add_form
      options = { class: 'item-form', id: 'item-form' }
      form_for(:item, '/items', options) do
        label('Add Item', for: :character)
        text_field(:character, class: 'item-input-field', autofocus: true, autocomplete: :off)
        submit('Create', id: 'item-submit')
      end
    end
  end
end
