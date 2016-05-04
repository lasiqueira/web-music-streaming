require 'test_helper'

class UsersControllerTest < ActionController::TestCase  
  test "should create user" do
	  assert_difference('User.count') do
	    post :create, user: {email: 'testusername@test.com', username: 'Testusername', password:'123451'}
	  end
    assert_response :success
  end

end
