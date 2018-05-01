class PostsController < ApplicationController
  def create
    @post = current_user.posts.new(post_params)
    if @post.save
      render json: { message: "success", fileID: @post.id  }, :status => 200
    else
      render json: { error: @post.errors.full_messages.join(',')}, :status => 400
    end     
  end

  def subscribed_posts
    # data = {}
    # @all_subscribed_users = current_user.all_following
    # @all_subscribed_users.each do |u|
    #   data[u.email] = u.posts
    # end
  end

private 
  def post_params
    params.require(:posts).permit(:image)
  end
end
