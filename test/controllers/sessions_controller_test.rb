require 'test_helper'

class SessionsControllerTest < ActionController::TestCase  
  test "should create session" do	  
	post :create, {'email' => "test@test.com", 'password'=> '1234'})
    assert_response :success
  end

end
