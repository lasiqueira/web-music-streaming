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
end
