Himmeli::Application.routes.draw do
  resources :versions

  resources :items

  resources :events

  resources :settings

  resources :people

  devise_for :users, path: "auth", path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    password: 'secret',
    confirmation: 'verification',
    unlock: 'unblock',
    registration: 'register',
    sign_up: 'cmon_let_me_in'
  }

  get 'game/:id' => 'game#index'

  root to: "people#index"

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".
end
