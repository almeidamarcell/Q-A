require 'digest/md5'
class MD5Authenticator
  def  self.crypt(plaintext)
    Digest::MD5.hexdigest(plaintext)
  end

  def self.authenticate(ciphertext, plaintext)
    ciphertext == Digest::MD5.hexdigest(plaintext)
  end
end
