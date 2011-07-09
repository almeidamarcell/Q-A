class ApplicationController < ActionController::Base
  protect_from_forgery

  def current_user
    @current_user ||= User.find_by_id(session['user_id']) if session['user_id'].present?
  end
end
