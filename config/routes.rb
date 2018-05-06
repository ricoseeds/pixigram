Rails.application.routes.draw do
  get 'users/search'

  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }
  resources :pictureboard, only: [:index]
  resources :posts, only: [:create] do 
  	collection do 
  		get :subscribed_posts
  	end
  end
  resources :follows, only:[:create, :destroy]
  root "pictureboard#index"
  # mount ImageUploader::UploadEndpoint => "/posts/images"
  mount ImageUploader.upload_endpoint(:cache) => "/images/upload"
  mount ImageUploader.upload_endpoint(:store) => "/images/upload_store"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
