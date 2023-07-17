require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "should not save without username" do
  	user = User.new
    user.email = "testy@test.com"
  	assert_not user.save
  end

  test "should not save without email" do
    user = User.new
    user.username = "testy"
    assert_not user.save
  end

  test "username should be unique" do
  	user = User.new
  	user.username = "test"
  	user.email = "testy@test.com"
    user.password = "1234" 
  	assert_not user.save
  end


  test "email should be unique" do
    user = User.new
    user.username = "testy"
    user.email = "test@test.com"
    user.password = "1234" 
    assert_not user.save
  end

  test "should save user if all conditions are met" do
    user = User.new
    user.username = "testyy"
    user.email = "testyy@test.com"
    user.password = "1234" 
    assert user.save
  end
end
