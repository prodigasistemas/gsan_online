Rails.application.routes.draw do
  root to: "home#index"
  get "*page", to: "home#index"
end
