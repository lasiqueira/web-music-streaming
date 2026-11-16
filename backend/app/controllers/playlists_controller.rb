class PlaylistsController < ApplicationController
  before_action :authenticate_user_from_token!
  before_action :set_playlist, only: [ :update, :destroy ]

  def create
    @playlist = Playlist.new(playlist_params)
    return unless authorized_user?(@playlist.user_id)

    if @playlist.save
      render json: @playlist, include: [ "songs" ], status: :created
    else
      render_errors @playlist
    end
  end

  def user_playlists
    return unless authorized_user?(params[:user_id])

    @playlists = Playlist.includes(:user, :songs).where(user_id: params[:user_id])
    render json: @playlists, include: [ "songs" ]
  end

  def update
    return unless authorized_user?(@playlist.user_id)

    # Assigning songs to a persisted record writes immediately, so only do it
    # after the ownership check, inside a transaction with the rename.
    saved = Playlist.transaction do
      @playlist.song_ids = playlist_params[:song_ids] || []
      @playlist.update(name: playlist_params[:name]) || raise(ActiveRecord::Rollback)
    end

    if saved
      render json: @playlist, include: [ "songs" ]
    else
      render_errors @playlist
    end
  end

  def destroy
    return unless authorized_user?(@playlist.user_id)

    @playlist.destroy
    head :no_content
  end

  private

  def set_playlist
    @playlist = Playlist.find_by(id: params[:id])
    render json: { error: t("playlists_controller.not_found") }, status: :not_found unless @playlist
  end

  def playlist_params
    params.expect(playlist: [ :name, :user_id, song_ids: [] ])
  end

  def authorized_user?(playlist_user_id)
    return true if current_user.id == playlist_user_id.to_i

    authentication_error
    false
  end

  def render_errors(record)
    render json: { errors: record.errors.full_messages }, status: :unprocessable_content
  end
end
