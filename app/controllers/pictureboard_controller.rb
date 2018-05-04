class PictureboardController < ApplicationController
  def index
    @post = Post.new
    @posts = current_user.posts
    @followed_users = current_user.all_following
  end
end
