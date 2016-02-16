class Genre < ActiveRecord::Base
	attr_accessor :name
	belongs_to_many :songs

end
