class ItemRepository < Hanami::Repository
  def find_or_create(character:)
    tmp = items.where(character: character).first
    return tmp if tmp
    create(character: character)
  end
end
