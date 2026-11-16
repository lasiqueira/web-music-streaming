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


  test "searches by song, genre, artist and album name" do
    assert_equal 3, Song.search("rock").count
    assert_equal [ "Strobe" ], Song.search("STROBE").pluck(:name)
    assert_equal 0, Song.search("%").count, "LIKE wildcards in the term are escaped"
  end

  test "download url points at the song in S3" do
    song = songs(:song_three)
    assert_equal "https://songs.s3.sa-east-1.amazonaws.com/Young%20%40%20Heart.mp3", song.download_url
  end

  test "should save song if all conditions are met" do
    song = Song.new
    song.name ="test_song"
    song.genre = genres(:genre_one)
    song.album = albums(:album_one)

    assert song.save
  end
end
