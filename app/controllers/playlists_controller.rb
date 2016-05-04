class PlaylistsController < ApplicationController
  before_action :authenticate_user_from_token!


  def create
    @playlist = Playlist.new(params[:playlist])
    @playlist.save

    render json: @playlist
  end

  def show
    @playlists = Playlist.includes(:user).where(:user => { id: params[:user_id] })
    @playlists.each do |playlist|
      playlist.songs.each do |song|
        song.get_download_url
      end
    end
    render json: @playlists
  end

  def update
    @playlist = Playlist.new(params[:playlist])
    
    @playlist.save

    render json: @playlist

  end

  def destroy
    @playlist = Playlist.new(params[:playlist])

    @playlist.destroy
  end
end
