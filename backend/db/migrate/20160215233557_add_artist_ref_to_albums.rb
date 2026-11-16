class AddArtistRefToAlbums < ActiveRecord::Migration[4.2]
  def change
    add_reference :albums, :artist, index: true, foreign_key: true
  end
end
