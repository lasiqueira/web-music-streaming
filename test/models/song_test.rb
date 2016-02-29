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
end
