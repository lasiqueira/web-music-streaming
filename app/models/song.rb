class Song < ActiveRecord::Base
	validates :name, presence: true
	attr_accessor :download_url
	has_and_belongs_to_many :playlists
	belongs_to :album
	belongs_to :genre

	def get_download_url
		@download_url = S3_BUCKET.objects.with_prefix(@genre.name).collect(@name).public_url
	end
end
