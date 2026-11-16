class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, serializer: SessionSerializer, root: nil, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_content
    end
  end

  private

  def user_params
    params.expect(user: [ :email, :username, :password, :password_confirmation ])
  end
end
