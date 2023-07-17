require 'test_helper'

class SearchesControllerTest < ActionController::TestCase
  setup do
  	@request.headers["Content-type"] = "application/json"
  end

  test "should search songs" do
    get 'songs', search: 'Rock'
    assert_response :success
    assert_not_nil assigns(:songs)
    assert assigns(:songs).count > 1
  end
end
