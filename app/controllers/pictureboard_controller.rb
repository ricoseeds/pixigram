class PictureboardController < ApplicationController
  def index
    @post = Post.new
    @posts = current_user.posts
  end
end
