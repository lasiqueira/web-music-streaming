require 'test_helper'

class SessionsControllerTest < ActionController::TestCase  
  include Devise::TestHelpers
  setup do
    @user = users(:user_one)
    @request.headers["Content-type"] = "application/json"
  end

  test "should create session" do	  
	post :create, id:'', email:@user.email, password: '1234'
    assert_response :success
  end

  test "should destroy session" do	  
	post :create, id:'', email:@user.email, password: '1234'

	delete :destroy
    assert_response :success
  end

end
