require "test_helper"

class PlaylistsTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:user_one)
    @playlist = playlists(:playlist_one)
    @other_playlist = playlists(:playlist_two)
  end

  test "requires a valid token" do
    get user_playlists_path(@user.id)
    assert_response :unauthorized

    get user_playlists_path(@user.id), headers: { "Authorization" => "1:not-the-token" }
    assert_response :unauthorized
  end

  test "creates a playlist" do
    song_ids = songs(:song_four, :song_five, :song_six).map(&:id)

    assert_difference("Playlist.count") do
      post playlists_path, params: { playlist: { name: "new one", user_id: @user.id, song_ids: song_ids } },
                           headers: auth_headers(@user), as: :json
    end

    assert_response :created
    assert_equal "new one", json_response["name"]
    assert_equal song_ids.sort, json_response["songs"].map { _1["id"] }.sort
    assert json_response["songs"].all? { _1["download_url"].present? }, "songs should include download urls"
  end

  test "does not create an invalid playlist" do
    assert_no_difference("Playlist.count") do
      post playlists_path, params: { playlist: { name: "", user_id: @user.id } }, headers: auth_headers(@user), as: :json
    end
    assert_response :unprocessable_content
    assert_includes json_response["errors"], "Name can't be blank"
  end

  test "lists the user's playlists" do
    get user_playlists_path(@user.id), headers: auth_headers(@user)

    assert_response :success
    assert_equal [ @playlist.id ], json_response.map { _1["id"] }
    assert_equal 3, json_response.first["songs"].size
    assert json_response.first["songs"].all? { _1["download_url"].present? }
  end

  test "updates a playlist" do
    song_ids = [ songs(:song_six).id ]
    put playlist_path(@playlist), params: { playlist: { name: "renamed", user_id: @user.id, song_ids: song_ids } },
                                  headers: auth_headers(@user), as: :json

    assert_response :success
    assert_equal "renamed", @playlist.reload.name
    assert_equal song_ids, @playlist.song_ids
  end

  test "destroys a playlist" do
    assert_difference("Playlist.count", -1) do
      delete playlist_path(@playlist), headers: auth_headers(@user)
    end
    assert_response :no_content
  end

  test "returns not found for a missing playlist" do
    delete playlist_path(id: 0), headers: auth_headers(@user)
    assert_response :not_found
  end

  test "does not create a playlist for a different user" do
    assert_no_difference("Playlist.count") do
      post playlists_path, params: { playlist: { name: "nope", user_id: users(:user_two).id, song_ids: [] } },
                           headers: auth_headers(@user), as: :json
    end
    assert_response :unauthorized
  end

  test "does not list a different user's playlists" do
    get user_playlists_path(users(:user_two).id), headers: auth_headers(@user)
    assert_response :unauthorized
  end

  test "does not update a different user's playlist" do
    original_song_ids = @other_playlist.song_ids

    put playlist_path(@other_playlist),
        params: { playlist: { name: "hijacked", user_id: @user.id, song_ids: [ songs(:song_eight).id ] } },
        headers: auth_headers(@user), as: :json

    assert_response :unauthorized
    @other_playlist.reload
    assert_equal "playlist_two", @other_playlist.name
    assert_equal original_song_ids.sort, @other_playlist.song_ids.sort
  end

  test "does not destroy a different user's playlist" do
    assert_no_difference("Playlist.count") do
      delete playlist_path(@other_playlist), headers: auth_headers(@user)
    end
    assert_response :unauthorized
  end
end
