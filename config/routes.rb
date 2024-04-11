Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :features, only: %i[index show] do
        resources :comments, only: %i[create]
      end
    end
  end

  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
