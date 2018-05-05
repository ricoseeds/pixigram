class PostsController < ApplicationController
  helper_method :jsonize_post
  def create
    @post = current_user.posts.new(post_params)
    if @post.save
      render json: { message: "success", fileID: @post.id  }, :status => 200
    else
      render json: { error: @post.errors.full_messages.join(',')}, :status => 400
    end     
  end

  def subscribed_posts
    data = []
    current_user.posts.each do |post|
      data << jsonize_post(post, current_user)
    end
    @all_subscribed_users = current_user.all_following
    @all_subscribed_users.each do |u|
      u.posts.each do |post|
        data << jsonize_post(post, u)
      end
    end
    render json: data
  end

private 
  def post_params
    params.require(:posts).permit(:image)
  end

  def jsonize_post(post, user)
    {
      id: post.id, 
      email: user.email.split("@").first, 
      image_url: post.image_url, 
      user_id: user.id, 
      created_at: post.created_at.strftime("%B %d, %Y")
    }
  end
end
