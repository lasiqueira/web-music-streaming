module SongsHelper
	def download_url_for(song_key)
		S3_BUCKET.object(song_key).public_url
	end
end
