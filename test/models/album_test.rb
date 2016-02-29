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
end
