class Answer < ActiveRecord::Base
  belongs_to :user
  belongs_to :question
  belongs_to :acceptor, :class => 'User', :foreign_key => 'accepted_by'
end
