require 'test_helper'

class GenreTest < ActiveSupport::TestCase
  test "should not save without name" do
  	genre = Genre.new
  	assert_not genre.save
  end
end
