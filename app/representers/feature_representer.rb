class FeatureRepresenter < Representable::Decorator
  include Representable::JSON

  property :id
  property :type
  nested :attributes do
    property :external_id
    property :magnitude
    property :place
    property :time
    property :tsunami
    property :mag_type
    property :title
    nested :coordinates do
      property :longitude
      property :latitude
    end
  end
  nested :links do
    property :external_url
  end
  property :comments
end