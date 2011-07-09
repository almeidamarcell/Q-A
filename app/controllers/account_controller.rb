class AccountController < ActionController::Base
  def index
    @user = User.new
  end

  def register
    @user = User.new(params[:user])
    @user.last_seen_on = Time.now.utc
    @user.display_name = @user.name

    respond_to do |format|
      if @user.save
        session['user_id'] = @user.id
        flash[:notice] = 'User was successfully created.'
        format.html { redirect_to :action => 'index' }
      else
        format.html { render :action => 'index' }
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

end
