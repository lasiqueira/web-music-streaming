class PlaylistsController < ApplicationController
  before_action :authenticate_user_from_token!

  def create
    @playlist = Playlist.new(playlist_params)
    if authorized_user(@playlist.user.id)
      @playlist.save
      render json: @playlist, include: ['songs']
    end
  end

  def user_playlists
    if authorized_user(params[:user_id])
      @playlists = Playlist.includes(:user, :songs).where(:users => { id: params[:user_id] }).references(:user, :songs)
      @playlists.each do |playlist|
        playlist.songs.each do |song|
          song.get_download_url
        end
      end
      render json: @playlists, include: ['songs']
    end
  end

  def update
    @playlist = Playlist.find_by_id(params[:id])

    changed_playlist = Playlist.new(playlist_params)
    @playlist.name = changed_playlist.name
    @playlist.songs = changed_playlist.songs
    if authorized_user(@playlist.user.id)
      @playlist.save
      render json: @playlist, include: ['songs']
    end
  end

  def destroy
    @playlist = Playlist.find_by_id(params[:id])
    if authorized_user(@playlist.user.id)
      @playlist.destroy
    end
  end

  private
  
  def playlist_params
    params.require(:playlist).permit(:name, :user_id, { :song_ids => [] })
  end

  def authorized_user(playlist_user_id)
   user_id = current_user.id
   unless user_id == playlist_user_id.to_i
     authentication_error
     return false
   end
   return true
  end
end


