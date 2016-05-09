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


  test "should find by all associations" do
  	songs = Song.includes(:genre, album: :artist).where("lower(name) LIKE '%?%' OR lower(genre.name) LIKE '%?%' OR lower(artist.name) LIKE '%?%' OR lower(album.name) LIKE '%?%'",
  														 'rock', 'rock', 'rock', 'rock')

  	assert_not_nil songs
  end

  test "get song url" do
  	song = songs(:song_one)
  	song.get_download_url

  	assert_not_nil song.download_url
  end

  test "should save song if all conditions are met" do
    song = Song.new
    song.name ="test_song"
    song.genre = genres(:genre_one)
    song.album = albums(:album_one)

    assert song.save
  end
end
