class Album < ActiveRecord::Base
	validates :name, presence: true
	attr_accessor :name
	belongs_to :artist
end
