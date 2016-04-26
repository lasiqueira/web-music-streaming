class PlaylistsController < ApplicationController
  before_action :authenticate_user_from_token!


  def create
    @playlist = Playlist.new(params[:playlist])
    @playlist.save
  end

  def index
    #@playlist = Playlist.find(params[:playlist_id])
    respond_to do |format|
      render.html
      render.json {render :json => @playlist}
    end
  end

  def update
    @playlist = Playlist.new(params[:playlist])
    
    @playkist.save

  end

  def destroy
    @playlist = Playlist.new(params[:playlist])

    @playlist.destroy
  end
end
