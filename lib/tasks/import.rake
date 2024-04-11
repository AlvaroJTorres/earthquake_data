namespace :import do
  desc 'Import data from http'
  task data: [:environment] do
    response = HTTParty.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson')
    earthquakes_data = JSON.parse(response.body)

    earthquakes_data["features"].each do |earthquake_data|
      earthquake = {
        type: earthquake_data["type"],
        external_id: earthquake_data["id"],
        magnitude: earthquake_data["properties"]["mag"],
        place: earthquake_data["properties"]["place"],
        time: earthquake_data["properties"]["time"],
        tsunami: earthquake_data["properties"]["tsunami"],
        mag_type: earthquake_data["properties"]["magType"],
        title: earthquake_data["properties"]["title"],
        longitude: earthquake_data["geometry"]["coordinates"][0],
        latitude: earthquake_data["geometry"]["coordinates"][1],
        external_url: earthquake_data["properties"]["url"],
      }
      new_feature = Feature.new(earthquake)
      puts "Feature not created. Errors: #{new_feature.errors.full_messages}" unless new_feature.save
    end
  end
end
