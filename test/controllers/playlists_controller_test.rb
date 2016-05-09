require 'test_helper'

class PlaylistsControllerTest < ActionController::TestCase
  include Devise::TestHelpers
  setup do
    @user = users(:user_one)
    @user_two = users(:user_two)
    @playlist = playlists(:playlist_one)
    @playlist.name = 'playlist_3'

    @request.headers["Content-type"] = "application/json"
    @request.headers["Authorization"] = @user.access_token
  end

  test "should create playlist" do
    
    assert_difference('Playlist.count') do
      post :create, playlist: {name: 'playlist_two', user_id: @user, song_ids: [songs(:song_four), songs(:song_five), songs(:song_six)]}
    end
    assert_response :success
  end

  test "should show user playlists" do
    get:user_playlists, user_id: @playlist.user
    assert_response :success
    assert_not_nil assigns(:playlists)
    assert assigns(:playlists).count > 0
  end

  test "should update playlist" do
    post :update, id:@playlist,  playlist: {id: @playlist, name: @playlist.name, user_id: @playlist.user, song_ids: @playlist.songs}
    assert_response :success
  end

  test "should destroy playlist" do
    post :destroy, id: @playlist
    assert_response :success
  end

end
