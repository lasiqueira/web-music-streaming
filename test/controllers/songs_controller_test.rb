require 'test_helper'

class SongsControllerTest < ActionController::TestCase
  setup do
    @request.headers["Content-type"] = "application/json"
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:songs)
    assert assigns(:songs).count > 1
  end
end
