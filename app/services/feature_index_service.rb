class FeatureIndexService < ApplicationService
  def initialize (params)
    super()
    @params = params
  end

  def call
    features_scope
  end

  private

  def features_scope
    FeaturesQuery.new.filter_by_mag_type(@params[:mag_type])
  end
end