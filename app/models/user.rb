require 'security/md5_authenticator'

class User < ActiveRecord::Base
  attr_accessor :password
  validates :name, :presence => true, :uniqueness => true
  validates :email, :uniqueness => { :if => 'email.present?' }
  validates :password, :presence => true, :confirmation => true

  before_save :encrypt_password

  def encrypt_password
    if password.present?
      self.password_digest = Digest::MD5.hexdigest(password)
    end
  end

  def authenticate(name, email, password)
    user = find_by_name(name)
    #if not found by name, try to find by email
    if user.nil?
      user = find_by_email(email)
    end

    if user && user.password_digest == Digest::MD5.hexdigest(password)
      user
    else
      nil
    end
  end

end
