require "test_helper"

class SongsTest < ActionDispatch::IntegrationTest
  test "lists all songs with album, artist and genre" do
    get songs_path

    assert_response :success
    assert_equal Song.count, json_response.size

    strobe = json_response.find { _1["name"] == "Strobe" }
    assert_equal "Division", strobe.dig("album", "name")
    assert_equal "PC-ONE", strobe.dig("album", "artist", "name")
    assert_equal "Rock", strobe.dig("genre", "name")
    assert_equal "https://songs.s3.sa-east-1.amazonaws.com/Strobe.mp3", strobe["download_url"]
  end

  test "searches songs by genre, artist, album or name" do
    { "rock" => 3, "PC-ONE" => 2, "inside" => 2, "strobe" => 1, "nothing matches" => 0 }.each do |term, count|
      get search_songs_path, params: { search: term }
      assert_response :success
      assert_equal count, json_response.size, "searching #{term.inspect}"
    end
  end

  test "search without a term lists everything" do
    get search_songs_path
    assert_response :success
    assert_equal Song.count, json_response.size
  end
end
