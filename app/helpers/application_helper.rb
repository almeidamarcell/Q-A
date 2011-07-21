require 'digest/md5'

module ApplicationHelper

  def time_difference(from_time, to_time = Time.now)
    time_diff_in_sec = (to_time - from_time).round

    case time_diff_in_sec
    when 0..60
      "Less than a minute ago..."
    when 61..(60*60)
      "#{time_diff_in_sec/60} minutes ago"
    when (60*60+1)..(60*60*24)
      "#{time_diff_in_sec/3600} hours ago"
    when (60*60*24+1)..(60*60*24*31)
      "#{time_diff_in_sec/(60*60*24)} days ago"
    when (60*60*24*31)..(60*60*24*31*12)
      "#{time_diff_in_sec/(60*60*24*31)} months ago"
    else
      "more than a year ago"
    end
  end

  def gravatar_url(email, pairs)
    defaults = { :size => '32', :default_image => 'identicon' }
    pairs = defaults.merge(pairs)

    hash = Digest::MD5.hexdigest(email.downcase)
    image_tag "http://www.gravatar.com/avatar/#{hash}?s=#{pairs[:size]}&d=#{pairs[:default_image]}", { :alt => pairs[:alt], :class => pairs[:class] }
  end

  def stars(count)
    html = ''
    (1..count).each do
      html << image_tag('/assets/star.jpg', { :alt => 'star', :title => 'stars represent your reputation' })
    end
    html
  end
end
