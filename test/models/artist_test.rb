require 'test_helper'

class ArtistTest < ActiveSupport::TestCase
  test "should not save without name" do
  	artist = Artist.new
  	assert_not artist.save
  end
end
