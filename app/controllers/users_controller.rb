class UsersController < ApplicationController
  def search
	 	if params[:search]
	    @people = User.where('email LIKE ?', "#{params[:search]}%")
	  else
	    @people = User.all
	  end
  	respond_to do |format|
    format.json {render :json => @people }
		end
  end
end
