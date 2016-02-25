class Genre < ActiveRecord::Base
	validates :name, presence: true
	attr_accessor :name
	belongs_to_many :songs

end
