class SongsController < ApplicationController
  def index
  	@songs = Song.all
  	render json: @songs

  end

  def show
  	@songs = Song.includes(:genre, album: :artist).where("lower(name) LIKE '%?%' OR lower(genre.name) LIKE '%?%' OR lower(artist.name) LIKE '%?%' OR lower(album.name) LIKE '%?%'",
  														 params[:search].downcase, params[:search].downcase, params[:search].downcase, params[:search].downcase) 
  	render json: @songs
  end
end
