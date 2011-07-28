class AccountController < ApplicationController
  layout "public"

  def registration
    @user = User.new

    @page.h2 = 'Register'
  end

  def register
    @user = User.new(params[:user])
    @user.last_seen_on = Time.now.utc
    @user.display_name = @user.name

    respond_to do |format|
      if @user.save
        session['user_id'] = @user.id
        flash[:notice] = 'User was successfully created.'
        format.html { redirect_to :root }
      else
        format.html { render :action => 'registration' }
      end
    end
  end

  def login
    @user = User.authenticate(params['name'], params['password'])

    if @user
      session['user_id'] = @user.id
      flash[:notice] = 'You have just successfully logged in!'
    else
      @user.errors.add_to_base("Invalid username or password!")
    end
  end

  def generic
    auth = request.env["omniauth.auth"]
    open_identifier = auth['uid']
    provider = request.env['provider']

    user = User.where('open_identifier = ? AND provider = ?', open_identifier, provider)

    user = User.new

    if user.nil?
      user = User.new
    end

    user.email = auth['user_info']['email']
    user.display_name = auth['user_info']['name']
    user.open_identifier = open_identifier
    #user.provider = provider

    user.save :validate => false

    raise request.env["omniauth.auth"].to_yaml
  end

end
