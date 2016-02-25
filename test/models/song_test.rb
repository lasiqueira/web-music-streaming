require 'test_helper'

class SongTest < ActiveSupport::TestCase
  test "should not save without name" do
  	song = Song.new
  	assert_not song.save
  end
end
