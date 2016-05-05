require 'test_helper'

class PlaylistsControllerTest < ActionController::TestCase

  setup do
    @playlist = playlists(:playlist_one)
    @playlist.name = 'playlist_3'
  end

  test "should create playlist" do
    assert_difference('Platlist.count') do
      post :create, playlist: {name: 'playlist_two', user: users(:user_one), songs: [songs(:song_four), songs(:song_five), songs(:song_six)]}
    end
    assert_response :success
  end

  test "should show user playlists" do
    get(:show, {'user_id' => "1"})
    assert_response :success
    assert_not_nil assigns(:playlists)
  end

  test "should update playlist" do
    post :update, playlist: @playlist
    assert_response :success
  end

  test "should destroy playlist" do
    post :destroy, playlist: @playlist
    assert_response :success
  end

end
