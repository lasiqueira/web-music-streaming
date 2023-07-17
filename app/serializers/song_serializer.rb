class SongSerializer < ActiveModel::Serializer
  attributes :id, :name, :download_url
  has_one :album
  has_one :genre
  
  
end
