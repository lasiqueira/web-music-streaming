class SongsController < ApplicationController
  def index
  	@songs = Song.all
  	
  	@songs.each do |song|
			song.get_download_url
	end
  	render json: @songs, include: ['genre', 'album', 'album.artist'], methods: [:download_url]
  end
end
