class Playlist < ActiveRecord::Base
	validates :name,, :user_id, presence: true
	has_and_belongs_to_many :songs
	belongs_to :user
end
