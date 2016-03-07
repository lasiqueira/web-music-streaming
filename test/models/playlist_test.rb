require 'test_helper'

class PlaylistTest < ActiveSupport::TestCase
  test "should not save without name" do
  	playlist = Playlist.new
  	assert_not playlist.save
  end
end
