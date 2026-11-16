class SongsController < ApplicationController
  def index
    @songs = Song.includes(:genre, album: :artist)
    render json: @songs, include: [ "genre", "album", "album.artist" ]
  end
end
