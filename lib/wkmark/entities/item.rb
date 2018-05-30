class Item < Hanami::Entity
  def type
    if character.size > 1
      'Vocabulary'
    else
      'Kanji'
    end
  end

  def to_h
    {
      id: id,
      character: character,
      reading: reading,
      meaning: meaning,
      type: type
    }
  end
end
