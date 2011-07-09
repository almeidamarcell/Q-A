class Question < ActiveRecord::Base
  belongs_to :user
  has_one :duplicate, :class_name => 'Question'
  belongs_to :duplicated_by, :class_name => 'User', :foreign_key => 'mark_as_duplicated_by'

  validates :title, :presence => true

end
