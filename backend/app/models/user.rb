class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  # (:validatable already checks email presence, format and uniqueness.)
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :playlists, dependent: :destroy

  validates :username, presence: true, uniqueness: true

  after_create :regenerate_access_token!

  # Tokens look like "<user id>:<random>" so the API can find the user quickly.
  def regenerate_access_token!
    update_column(:access_token, generate_access_token)
  end

  private

  def generate_access_token
    loop do
      token = "#{id}:#{Devise.friendly_token}"
      break token unless User.exists?(access_token: token)
    end
  end
end
