class PlaylistSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :songs
  belongs_to :user
end
