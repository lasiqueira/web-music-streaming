# frozen_string_literal: true

# This API authenticates with access tokens (see ApplicationController), so
# Devise is only used for password hashing, validations and `sign_in`.
Devise.setup do |config|
  config.mailer_sender = "please-change-me-at-config-initializers-devise@example.com"

  require "devise/orm/active_record"

  config.case_insensitive_keys = [ :email ]
  config.strip_whitespace_keys = [ :email ]

  # API only: never store the user in a session or answer with HTML redirects.
  config.skip_session_storage = [ :http_auth, :params_auth ]
  config.navigational_formats = []

  config.stretches = Rails.env.test? ? 1 : 12
  config.reconfirmable = true
  config.expire_all_remember_me_on_sign_out = true
  config.password_length = 8..128
  config.email_regexp = /\A[^@\s]+@[^@\s]+\z/
  config.reset_password_within = 6.hours
  config.sign_out_via = :delete
end
