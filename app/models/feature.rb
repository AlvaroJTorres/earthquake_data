class Feature < ApplicationRecord
  has_many :comments

  validates :title, :external_url, :place, :mag_type, presence: true
  validates :external_id, uniqueness: { message: 'Feature already exists on db' }
  validates :magnitude, numericality: { in: -1..10 }
  validates :latitude, numericality: { in: -90..90 }
  validates :longitude, numericality: { in: -180..180 }
end
