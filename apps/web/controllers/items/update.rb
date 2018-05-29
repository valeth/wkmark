module Web::Controllers::Items
  class Update
    include Web::Action

    params do
      required(:id).filled(:int?)
      required(:item).schema do
        required(:reading) { none? | (filled? & str?) }
        required(:meaning) { none? | (filled? & str?) }
      end
    end

    def call(params)
      Hanami.logger.debug { params[:item].inspect }
      if params.valid?
        ItemRepository.new.update(params[:id], params[:item])
      else
        self.status = 422
      end

      redirect_to routes.path(:root)
    end
  end
end
