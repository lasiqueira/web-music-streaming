require 'test_helper'

class AlbumTest < ActiveSupport::TestCase
  test "should not save without name" do
  	album = Album.new
  	assert_not album.save
  end
end
