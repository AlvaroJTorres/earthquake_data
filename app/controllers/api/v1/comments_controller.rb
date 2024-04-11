module Api
  module V1
    class CommentsController < ApplicationController
      def create
        result = CommentService.call(params[:feature_id], comment_params)
        comment = CommentRepresenter.new(result)
        render json: { data: { comment: comment } }, status: :created
      end
    
      private
    
      def comment_params
        params.require(:data).permit(:feature_id, :body)
      end
    end
  end
end
