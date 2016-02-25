class Playlist < ActiveRecord::Base
	validates :name,, :user_id, presence: true
	attr_accessor :name
	has_and_belongs_to_many :songs
	belongs_to :user
end
