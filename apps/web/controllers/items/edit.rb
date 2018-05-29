module Web::Controllers::Items
  class Edit
    include Web::Action

    expose :item

    params do
      required(:id).filled(:int?)
    end

    def call(params)
      if params.valid?
        @item = ItemRepository.new.find(params[:id])
      else
        self.status = 422
        redirect_to routes.path(:root)
      end
    end
  end
end
