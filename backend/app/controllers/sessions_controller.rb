class SessionsController < ApplicationController
  before_action :authenticate_user_from_token!, only: :destroy

  def create
    @user = User.find_for_database_authentication(email: params[:email])

    if @user&.valid_password?(params[:password])
      sign_in :user, @user, store: false
      render json: @user, serializer: SessionSerializer, root: nil
    else
      invalid_login_attempt
    end
  end

  # Replaces the user's access token so the one used to log out stops working.
  # Each user has a single token, so this signs them out on every device.
  def destroy
    current_user.regenerate_access_token!
    head :no_content
  end

  private

  def invalid_login_attempt
    warden.custom_failure!
    render json: { error: t("sessions_controller.invalid_login_attempt") }, status: :unprocessable_content
  end
end
