class User < ActiveRecord::Base
	has_secure_password
	validates :login, presence: true
	validates :login, uniqueness: true
	has_many :playlists, dependent: :destroy

end
