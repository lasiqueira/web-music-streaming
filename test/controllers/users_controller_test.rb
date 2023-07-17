require 'test_helper'

class UsersControllerTest < ActionController::TestCase  
  setup do
    @request.headers["Content-type"] = "application/json"
  end
  
  test "should create user" do
	  assert_difference('User.count') do
	    post :create, user: {email: 'testusername@test.com', username: 'Testusername', password:'123451', password_confirmation:'123451'}
	  end
    assert_response :success
  end

end
