require 'test_helper'

class ArtistTest < ActiveSupport::TestCase
  test "should not save without name" do
  	artist = Artist.new
  	assert_not artist.save
  end

  test "find by name" do
  	artist = Artist.find_by_name("Portrayal")
  	assert_not_nil artist
  end

  test "should save artist if all conditions are met" do
    artist = Artist.new
  	artist.name = "Test_artist"
  	assert artist.save
  end
end
