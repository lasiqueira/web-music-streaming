class PlaylistSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :songs
  has_one :user
end
