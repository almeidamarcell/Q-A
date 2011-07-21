class UsersController < ApplicationController
  layout 'public'
  def all
    page = params[:page].nil? ? 1 : params[:page]
    size = params[:size].nil? ? 2 : params[:size]

    order_column = :created_at

    case params[:order]
    when "newest"
      order_column = :created_at
    when "by_reputation"
      order_column = :reputation
    end

    @order = params[:order].nil? ? "newest" : params[:order]

    @users = User.order(order_column.to_s + " desc").page(page).per(size)

    #page data
    @page.h2 = 'All users'

  end

  def search
    page = params[:page].nil? ? 1 : params[:page]
    size = params[:size].nil? ? 2 : params[:size]

    order_column = :created_at

    case params[:order]
    when "newest"
      order_column = :created_at
    when "by_reputation"
      order_column = :reputation
    end

    @order = params[:order].nil? ? "newest" : params[:order]

    @users = User.where('display_name LIKE ?', "%#{params[:search]}%").order(order_column.to_s + " desc").page(page).per(size)

    @page.h2 = 'All Users'

    if request.xhr?
      render :partial => "/shared/allusers.html.erb"
    else
      render "all"
    end
  end

end
