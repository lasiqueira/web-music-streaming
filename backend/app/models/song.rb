class Song < ApplicationRecord
  belongs_to :album, optional: true
  belongs_to :genre, optional: true
  has_and_belongs_to_many :playlists

  validates :name, presence: true

  # Case-insensitive match on song, genre, artist or album name.
  scope :search, ->(term) {
    pattern = "%#{sanitize_sql_like(term.to_s.downcase)}%"
    left_joins(:genre, album: :artist)
      .where(
        "LOWER(songs.name) LIKE :q OR LOWER(genres.name) LIKE :q OR LOWER(artists.name) LIKE :q OR LOWER(albums.name) LIKE :q",
        q: pattern
      )
  }

  def download_url
    @download_url ||= self.class.public_s3_url("#{name}.mp3")
  end

  # Builds the public (unsigned) URL of an object in the songs bucket, escaping
  # the key the same way the AWS SDK does.
  def self.public_s3_url(key)
    bucket = Rails.configuration.x.s3.bucket
    region = Rails.configuration.x.s3.region
    path = key.gsub(%r{[^/]+}) { |part| CGI.escape(part).gsub("+", "%20").gsub("%7E", "~") }

    if bucket.match?(/\A[a-z0-9][a-z0-9-]{1,61}[a-z0-9]\z/)
      "https://#{bucket}.s3.#{region}.amazonaws.com/#{path}"
    else
      "https://s3.#{region}.amazonaws.com/#{bucket}/#{path}" # e.g. bucket names with dots
    end
  end
end
