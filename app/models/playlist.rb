class Playlist < ActiveRecord::Base
	attr_accessor :name
	has_and_belongs_to_many :songs
	belongs_to :user
end
