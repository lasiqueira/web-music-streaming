require 'test_helper'

class PlaylistTest < ActiveSupport::TestCase
  test "should not save without name" do
  	playlist = Playlist.new
  	assert_not playlist.save
  end

  test "should not save without a user" do
  	playlist = Playlist.new
  	playlist.name ="testy_playlist"
  	assert_not playlist.save
  end

   test "should save playlist if all conditions are met" do
    playlist = Playlist.new
  	playlist.name ="testy_playlist"
  	playlist.user = users(:user_one)
  	playlist.songs = [songs(:song_one), songs(:song_two)]

    assert playlist.save
  end

end
