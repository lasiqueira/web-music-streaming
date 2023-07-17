class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  after_create :update_access_token!
  
	validates :username, presence: true
	validates :username, uniqueness: true

	validates :email, presence: true
	validates :email, uniqueness: true
	
	has_many :playlists, dependent: :destroy

  private

  def update_access_token!
    self.access_token = generate_access_token
    self.save
  end

  def generate_access_token
    loop do
      token = "#{self.id}:#{Devise.friendly_token}"
      break token unless User.where(access_token: token).first
    end
  end

end
