class Artist < ActiveRecord::Base
	attr_accessor :name
	has_many :albums

end
