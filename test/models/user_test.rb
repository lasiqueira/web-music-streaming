require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "should not save without login" do
  	user = User.new
  	assert_not user.save
  end

  test "login should be unique" do
  	user = User.new
  	user.name = "test"
  	user.password_digest = "1234" 
  	assert_not user.save
  end

  test "find by login and authenticate user"
  	user= User.find_by_login("test")
  	assert user.authenticate("1234")
  end
end
