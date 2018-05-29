module Web::Views::Items
  class Index
    include Web::View

    def reading(item)
      if item.reading
        "#{item.character} (#{item.reading})"
      else
        item.character
      end
    end

    def item_form(item)
      options = { id: 'item-buttons', class: 'item-buttons', method: :delete }
      form_for(:item, routes.path(:item, id: item.id), options) do
        submit('Delete', class: 'btn-delete-item')
      end
    end

    def item_add_form
      options = { class: 'item-form', id: 'item-form' }
      form_for(:item, '/items', options) do
        label('Add Item', for: :character)
        text_field(:character, class: 'item-input-field', autofocus: true, autocomplete: :off)
        submit('Create')
      end
    end
  end
end
