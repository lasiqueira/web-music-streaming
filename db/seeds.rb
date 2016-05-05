
genres = Genre.create([{name: 'Blues'},
					   {name: 'Jazz'},
					   {name: 'Rock'}])

artists = Artist.create([{name: 'Forget the Whale'},
						 {name: 'The Agrarians'}, 
						 {name: 'Paolo Pavan'}, 
						 {name: 'PC-ONE'}, 
						 {name: 'Portrayal'}]) 

albums = Album.create([{name: 'What I Tell Myself EP', artist: artists[0]}, 
					   {name: 'We are yet but young in deed.', artist: artists[1]},
					   {name: 'Inside', artist: artists[2]},
					   {name: 'Division', artist: artists[3]},
					   {name: 'To the Black Sea', artist: artists[4]}])

songs = Song.create([{name: 'I Know Where You\'ve Been (Instrumental)', genre: genres[0], album: albums[0]},
					 {name: 'We\'ll Make Love Anew', genre: genres[0], album: albums[1]},
					 {name: 'Young @ Heart', genre: genres[0], album: albums[1]},
					 {name: 'Blue Night Dance', genre: genres[1], album: albums[2]},
					 {name: 'What\'s Up', genre: genres[1], album: albums[2]},
					 {name: 'Strobe', genre: genres[2], album: albums[3]},
					 {name: 'Out of Light', genre: genres[2], album: albums[4]},
					 {name: 'You and Everyone', genre: genres[2], album: albums[3]}])

user = User.create(username: 'test', email: 'test@test.com', password:'1234', password_confirmation:'1234')

playlist = Playlist.create(name:'test playlist 1', user: user, songs: [songs[1], songs[2], songs[3]])