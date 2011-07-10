class AdminController < ApplicationController
  before_filter :require_admin

  def require_admin
    authenticate_or_request_with_http_basic do |username, password|
      username == Qa::Application.config.admin_user_name && password == Qa::Application.config.admin_password
    end
  end
end
