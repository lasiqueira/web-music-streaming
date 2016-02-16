class Song < ActiveRecord::Base
	attr_accessor :name
	has_and_belongs_to_many :playlists
	belongs_to :album
	has_one :genre
end
