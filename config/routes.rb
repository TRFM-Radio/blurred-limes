Rails.application.routes.draw do
  resources :food_items
  get 'home/index'
  devise_for :users
  get '*path', to: 'home#index', constraints: ->(request){ request.format.html? }
  root 'home#index'
end
