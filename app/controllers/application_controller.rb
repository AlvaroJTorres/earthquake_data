class ApplicationController < ActionController::Base  #ActionController::API
  protect_from_forgery unless: -> { request.format.json? }
  include ApplicationHelper
  include Pagy::Backend
end
