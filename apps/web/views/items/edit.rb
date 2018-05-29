module Web::Views::Items
  class Edit
    include Web::View

    def item_form(item)
      options = { id: 'item-edit', class: 'item-edit-form', method: :patch, values: { item: item } }
      form_for(:item, routes.path(:item, id: item.id), options) do
        label(:character)
        text_field(:character, class: 'item-character')
        label(:reading)
        text_field(:reading, class: 'item-reading')
        label(:meaning)
        text_field(:meaning, class: 'item-meaning')
        submit('Update')
      end
    end
  end
end
