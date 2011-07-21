require 'components/view_bag'

class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :init_page_meta
  after_filter :end_page_meta

  protected
  def current_user
    @current_user ||= User.find_by_id(session['user_id']) if session['user_id'].present?
  end

  def init_page_meta
    @start_time = Time.now
    @page = ViewBag.new
    @page.social.fb.app_id = '123123';
  end

  def end_page_meta
    @page.stats.generated_in = Time.now - @start_time
    logger.debug @page.to_s
  end

end
