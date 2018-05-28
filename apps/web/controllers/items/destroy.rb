module Web::Controllers::Items
  class Destroy
    include Web::Action

    params do
      required(:id)
    end

    def call(params)
      if params.valid?
        ItemRepository.new.delete(params[:id])
      else
        self.status = 422
      end

      redirect_to '/'
    end
  end
end
