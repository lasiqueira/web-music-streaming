require 'test_helper'

class SongTest < ActiveSupport::TestCase
  test "should not save without name" do
  	song = Song.new
  	assert_not song.save
  end

  test "find by name" do
  	song = Song.find_by_name("Strobe")
  	assert_not_nil song
  end

  test "get song url" do
  	song = Song.find_by_name("Strobe")
  	assert_not_nil song
  	song.get_download_url

  	assert_not_nil song.download_url
  end
end
