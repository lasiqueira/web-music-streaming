class SongSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_one :album
  has_one :genre
  
end
