class CommentService < ApplicationService
  def initialize (feature_id, comment_params)
    super()
    @feature_id = feature_id
    @comment_params = comment_params
  end

  def call
    feature = set_feature
    feature.comments.new(@comment_params)
    feature.save
    feature.comments.last    
  end

  private

  def set_feature
    Feature.find(@feature_id)    
  end
end