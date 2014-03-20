class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :authenticate_user!

  # median value for views
  # http://rosettacode.org/wiki/Averages/Median#Ruby
  helper_method :median
  def median(ary)
    return nil if ary.empty?
    mid, rem = ary.length.divmod(2)
    if rem == 0
      ary.sort[mid-1,2].inject(:+) / 2.0
    else
      ary.sort[mid]
    end
  end

end
