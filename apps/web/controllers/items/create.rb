module Web::Controllers::Items
  class Create
    include Web::Action

    expose :item

    params do
      required(:item).schema do
        required(:character).filled(:str?)
      end
    end

    def call(params)
      if params.valid?
        @item = ItemRepository.new.find_or_create(params[:item])
      else
        self.status = 422
      end

      redirect_to '/'
    end
  end
end
