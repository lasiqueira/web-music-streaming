# Example catalog. The actual audio files must exist in the S3 bucket as
# "<song name>.mp3" (see README). Safe to run multiple times.

genres = %w[Blues Jazz Rock].to_h { |name| [ name, Genre.find_or_create_by!(name: name) ] }

albums = {
  "What I Tell Myself EP" => "Forget the Whale",
  "We are yet but young in deed." => "The Agrarians",
  "Inside" => "Paolo Pavan",
  "Division" => "PC-ONE",
  "To the Black Sea" => "Portrayal"
}.to_h do |album_name, artist_name|
  artist = Artist.find_or_create_by!(name: artist_name)
  [ album_name, Album.find_or_create_by!(name: album_name, artist: artist) ]
end

songs = [
  [ "I Know Where You've Been (Instrumental)", "Blues", "What I Tell Myself EP" ],
  [ "We'll Make Love Anew", "Blues", "We are yet but young in deed." ],
  [ "Young @ Heart", "Blues", "We are yet but young in deed." ],
  [ "Blue Night Dance", "Jazz", "Inside" ],
  [ "What's Up", "Jazz", "Inside" ],
  [ "Strobe", "Rock", "Division" ],
  [ "Out of Light", "Rock", "To the Black Sea" ],
  [ "You and Everyone", "Rock", "Division" ]
].map do |name, genre, album|
  Song.find_or_create_by!(name: name, genre: genres.fetch(genre), album: albums.fetch(album))
end

user = User.find_or_create_by!(email: "test@test.com") do |u|
  u.username = "test"
  u.password = u.password_confirmation = "password"
end

Playlist.find_or_create_by!(name: "test playlist 1", user: user) do |playlist|
  playlist.songs = songs[1..3]
end
