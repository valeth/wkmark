module Web::Controllers::Items
  class Index
    include Web::Action

    expose :items

    def call(params)
      @items = ItemRepository.new.all
    end
  end
end
