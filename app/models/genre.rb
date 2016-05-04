class Genre < ActiveRecord::Base
	validates :name, presence: true
	belongs_to_many :songs

end
