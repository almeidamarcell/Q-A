require 'components/stats'
require 'components/meta'
require 'components/app'
require 'components/social'
require 'components/google'

class ViewBag
  attr_accessor :social, :stats, :meta, :title, :app, :h2, :google, :url

  def initialize
    @stats = Stats.new
    @meta = Meta.new
    @title = ''
    @h2 = ''
    @app = App.new
    @social = Social.new
    @google = Google.new
    @url = ''
  end
end
