module Api
  module V1
    class FeaturesController < ApplicationController
      def index
        @features = FeatureIndexService.call(query_params)
        @pagy, @records = pagy(@features, items: 1000)
        @records = FeaturesRepresenter.for_collection.new(@records)
        pagy_metadata = pagy_metadata(@pagy)
        transformed_metadata = transform_pagy_metadata(pagy_metadata)
        render json: { data: @records, pagination: transformed_metadata }, status: :ok
      end
    
      def show
        result = FeatureShowService.call(params[:id])
        @feature = FeatureRepresenter.new(result)
        render json: { data: @feature }
      end
    
      private
    
      def feature_params
        params.require(:feature).permit(:mag_type)
      end
    
      def query_params
        params.slice(:mag_type)
      end
    end
  end
end
