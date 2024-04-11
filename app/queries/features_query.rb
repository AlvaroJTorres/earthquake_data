class FeaturesQuery
  attr_reader :relation

  def initialize(relation = Feature.all)
    @relation = relation
  end

  def filter_by_mag_type(mag_type)
    return relation unless mag_type.present?

    relation.where(mag_type: mag_type)
  end
end