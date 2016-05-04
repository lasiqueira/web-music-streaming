class Song < ActiveRecord::Base
	validates :name, presence: true
	has_and_belongs_to_many :playlists
	belongs_to :album
	has_one :genre

	def get_download_url()
		:download_url = S3_BUCKET.object(:name).public_url
	end
end
