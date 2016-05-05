require 'test_helper'

class GenreTest < ActiveSupport::TestCase
  test "should not save without name" do
  	genre = Genre.new
  	assert_not genre.save
  end

  test "find by name" do
  	genre = Genre.find_by_name("Rock")
  	assert_not_nil genre
  end

  test "should save genre if all conditions are met" do
    genre = Genre.new
  	genre.name = "Test_genre"
  	assert genre.save
  end
end
