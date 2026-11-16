class SearchesController < ApplicationController
  def songs
    @songs = Song.search(params[:search]).includes(:genre, album: :artist)
    render json: @songs, include: [ "genre", "album", "album.artist" ]
  end
end
