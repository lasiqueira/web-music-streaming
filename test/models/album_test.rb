require 'test_helper'

class AlbumTest < ActiveSupport::TestCase
  test "should not save without name" do
  	album = Album.new
  	assert_not album.save
  end

  test "find by name" do
  	album = Album.find_by_name("Inside")
  	assert_not_nil album
  end

  test "should save album if all conditions are met" do
    album = Album.new
  	album.name = "Test_album"
  	album.artist = artists(:artist_one)
  	assert album.save
  end
end
