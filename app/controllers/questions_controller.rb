class QuestionsController < ApplicationController
  layout 'public'

  def all
    order_by = params[:order_by]
  end
end
