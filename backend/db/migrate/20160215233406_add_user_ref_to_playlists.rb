class AddUserRefToPlaylists < ActiveRecord::Migration[4.2]
  def change
    add_reference :playlists, :user, index: true, foreign_key: true
  end
end
