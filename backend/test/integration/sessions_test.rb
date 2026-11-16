require "test_helper"

class SessionsTest < ActionDispatch::IntegrationTest
  test "logs in with valid credentials" do
    user = users(:user_one)
    post login_path, params: { email: user.email, password: "password" }, as: :json

    assert_response :success
    assert_equal user.access_token, json_response["access_token"]
    assert_equal user.id, json_response["user_id"]
    assert_equal user.email, json_response["email"]
  end

  test "rejects invalid credentials" do
    post login_path, params: { email: users(:user_one).email, password: "wrong" }, as: :json
    assert_response :unprocessable_content
    assert_equal "Invalid email or password.", json_response["error"]

    post login_path, params: { email: "nobody@test.com", password: "password" }, as: :json
    assert_response :unprocessable_content
  end

  test "logging out invalidates the access token" do
    user = users(:user_one)
    old_headers = auth_headers(user)

    delete login_path, headers: old_headers
    assert_response :no_content

    get user_playlists_path(user.id), headers: old_headers
    assert_response :unauthorized, "the old token should no longer work"

    user.reload
    assert user.access_token.start_with?("#{user.id}:")
    get user_playlists_path(user.id), headers: auth_headers(user)
    assert_response :success

    post login_path, params: { email: user.email, password: "password" }, as: :json
    assert_equal user.access_token, json_response["access_token"], "logging in again returns the new token"
  end

  test "logging out requires a valid token" do
    delete login_path
    assert_response :unauthorized
  end
end
