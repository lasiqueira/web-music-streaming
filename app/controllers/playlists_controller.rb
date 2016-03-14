class PlaylistsController < ApplicationController
  def new
    @playlist = Playlist.new
    respond_to do |format|
      format.html
      format.json{format :json => @playlist}
    end
  end

  def create
    @playlist = Playlist.new(params[:playlist])
    @playlist.save
  end

  def show
    #@playlist = Playlist.find(params[:playlist_id])
    respond_to do |format|
      render.html
      render.json {render :json => @playlist}
    end
  end

  def edit
    @playlist = Playlist.new(params[:playlist])
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
