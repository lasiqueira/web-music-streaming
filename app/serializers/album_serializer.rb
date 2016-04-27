class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :name
  belongs_to :artist
end
