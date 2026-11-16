require "test_helper"

class UsersTest < ActionDispatch::IntegrationTest
  test "signs up a user and returns an access token" do
    assert_difference("User.count") do
      post users_path, params: { user: { email: "new@test.com", username: "newuser",
                                         password: "12345678", password_confirmation: "12345678" } }, as: :json
    end

    assert_response :created
    user = User.find_by!(email: "new@test.com")
    assert_equal user.access_token, json_response["access_token"]
    assert json_response["access_token"].start_with?("#{user.id}:")
  end

  test "returns validation errors" do
    assert_no_difference("User.count") do
      post users_path, params: { user: { email: "test@test.com", username: "test",
                                         password: "1", password_confirmation: "2" } }, as: :json
    end

    assert_response :unprocessable_content
    assert_includes json_response["errors"], "Email has already been taken"
    assert_includes json_response["errors"], "Username has already been taken"
    assert_includes json_response["errors"], "Password confirmation doesn't match Password"
    assert_includes json_response["errors"], "Password is too short (minimum is 8 characters)"
  end
end
