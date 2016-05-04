require 'test_helper'

class PlaylistsControllerTest < ActionController::TestCase

  test "should create playlist" do
    assert_difference('Platlist.count') do
      post :create, playlist: {email: 'testusername@test.com', username: 'Testusername', password:'123451'}
    end
    assert_response :success
  end

  test "should show user playlists" do
    get(:show, {'user_id' => "1"})
    assert_response :success
    assert_not_nil assigns(:playlists)
  end

  test "should update playlist" do
    post :update
    assert_response :success
  end

  test "should destroy playlist" do
    post :destroy
    assert_response :success
  end

end
