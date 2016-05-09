class SearchesController < ApplicationController
	def songs
		@songs = Song.includes(:genre, album: :artist).where("lower(songs.name) LIKE ? OR lower(genres.name) LIKE ? OR lower(artists.name) LIKE ? OR lower(albums.name) LIKE ?",
														 "%#{params[:search].downcase}%", "%#{params[:search].downcase}%", "%#{params[:search].downcase}%", "%#{params[:search].downcase}%").references(:genre, album: :artist)

		@songs.each do |song|
			song.get_download_url
		end													  
		render json: @songs   	
  end
end
