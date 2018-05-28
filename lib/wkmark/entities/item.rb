class Item < Hanami::Entity
  def type
    if character.size > 1
      'Vocabulary'
    else
      'Kanji'
    end
  end
end
