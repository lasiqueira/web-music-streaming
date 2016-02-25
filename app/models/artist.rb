class Artist < ActiveRecord::Base
	validates :name, presence: true
	attr_accessor :name
	has_many :albums

end
