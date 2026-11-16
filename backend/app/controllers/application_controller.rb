class ApplicationController < ActionController::API
  include AbstractController::Translation

  private

  # Authenticates requests sending `Authorization: <access token>`.
  def authenticate_user_from_token!
    auth_token = request.headers["Authorization"].to_s
    user_id = auth_token.split(":").first
    user = User.find_by(id: user_id) if auth_token.include?(":")

    if user&.access_token.present? && Devise.secure_compare(user.access_token, auth_token)
      sign_in user, store: false
    else
      authentication_error
    end
  end

  def authentication_error
    render json: { error: t("application_controller.unauthorized") }, status: :unauthorized
  end
end
