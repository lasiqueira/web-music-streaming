require "test_helper"

class CorsTest < ActionDispatch::IntegrationTest
  test "allows the configured frontend origin" do
    get songs_path, headers: { "Origin" => "http://localhost:8080" }
    assert_equal "http://localhost:8080", response.headers["Access-Control-Allow-Origin"]
  end

  test "does not allow other origins" do
    get songs_path, headers: { "Origin" => "https://evil.example.com" }
    assert_nil response.headers["Access-Control-Allow-Origin"]
  end
end
