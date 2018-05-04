class FollowsController < ApplicationController
    # before_action :authenticate_user!
  respond_to :js

  def create
    @user = User.find(params[:id])
    current_user.follow(@user)
    respond_to do |format|
      format.js {}
    end
  end

  def destroy
    @user = User.find(params[:id])
    current_user.stop_following(@user)
    respond_to do |format|
      format.js {}
    end
  end
end
