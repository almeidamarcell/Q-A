class AdminController < ApplicationController
  before_filter :require_admin

  def require_admin
    authenticate_or_request_with_http_basic do |username, password|
      username == 'michal' && password == 'test'
    end
  end
end
