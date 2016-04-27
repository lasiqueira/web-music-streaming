class SongSerializer < ActiveModel::Serializer
  attributes :id, :name
  belongs_to :album
  has_one :genre
  
end
