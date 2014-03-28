class GameController < ApplicationController
  layout 'game'

  def index
    @person = Person.find_by id: params[:id]
    @person.scores = @person.events.sum('scores')
  end
end
