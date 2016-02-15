class Genre < ActiveRecord::Base
	belongs_to_many :songs
end
