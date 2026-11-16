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
    user.password = "password"
  	assert_not user.save
  end


  test "email should be unique" do
    user = User.new
    user.username = "testy"
    user.email = "test@test.com"
    user.password = "password"
    assert_not user.save
  end

  test "should save user if all conditions are met" do
    user = User.new
    user.username = "testyy"
    user.email = "testyy@test.com"
    user.password = "password"
    assert user.save
  end

  test "password must have at least 8 characters" do
    user = User.new(username: "shorty", email: "shorty@test.com", password: "1234567")
    assert_not user.save
    assert_includes user.errors.full_messages, "Password is too short (minimum is 8 characters)"
  end
end
