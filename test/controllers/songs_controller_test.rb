require 'test_helper'

class SongsControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:songs)
  end

  test "should get show" do
    get(:show, {'search' => "Rock"})
    assert_response :success
    assert_not_nil assigns(:songs)
  end
end
