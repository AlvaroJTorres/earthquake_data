class FeatureShowService < ApplicationService
  def initialize (params)
    super()
    @params = params
  end

  def call
    Feature.find_by(id: @params)
  end
end