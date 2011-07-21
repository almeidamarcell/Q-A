class Social
  attr_accessor :twitter_link, :email, :fb

  def initialize
    @fb = Facebook.new
  end
end

class Facebook
  attr_accessor :app_id, :app_name
end
