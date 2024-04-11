# README

# earthquake_data

## Install

### Clone the repository

### Check your Ruby version

```shell
ruby -v
```

The ouput should start with something like `ruby 3.0.4`

If not, install the right ruby version using [rbenv](https://github.com/rbenv/rbenv) (it could take a while):

```shell
rbenv install 3.0.4
```

### Install dependencies

This project incorporates React for the frontend development. So it can leverage the capabilities of React within the Rails ecosystem to build dynamic and interactive user interfaces. However, it's important to note that the React library we use is tightly integrated into our Rails project and is not a standalone React application, that's why you have to also install the dependencies required to run it properly as well as the ruby gems integrated in the project. 

```shell
bundle install
yarn install
```

### Configuration

You may want to initiate your server and create a database if neccesary.

```shell
rails db:create
```

To populate the database, use the following Task to generate the data to be used in the application. The data is obtain from https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson

```shell
rake import:data
```

## Server
To start the application use the following command to allow the React dependecies to load properly (Routers and Bootstrap)

```shell
bin/dev
Visit http://localhost:3000/
```

## Endpoints

Method GET '/api/v1/features'

Response example:

```json
{
    "data": [
        {
            "id": 999,
            "type": "Feature",
            "attributes": {
                "external_id": "nc74029896",
                "magnitude": "1.03",
                "place": "2 km N of The Geysers, CA",
                "time": "1712354300010",
                "tsunami": false,
                "mag_type": "md",
                "title": "M 1.0 - 2 km N of The Geysers, CA",
                "coordinates": {
                    "longitude": "-122.7580032",
                    "latitude": "38.7960014"
                }
            },
            "links": {
                "external_url": "https://earthquake.usgs.gov/earthquakes/eventpage/nc74029896"
            }
        },
        {
            "id": 1000,
            "type": "Feature",
            "attributes": {
                "external_id": "nc74029891",
                "magnitude": "0.92",
                "place": "5 km W of Cobb, CA",
                "time": "1712353982500",
                "tsunami": false,
                "mag_type": "md",
                "title": "M 0.9 - 5 km W of Cobb, CA",
                "coordinates": {
                    "longitude": "-122.7803345",
                    "latitude": "38.8204994"
                }
            },
            "links": {
                "external_url": "https://earthquake.usgs.gov/earthquakes/eventpage/nc74029891"
            }
        }
    ],
    "pagination": {
        "current_page": 1,
        "total": 9671,
        "per_page": 1000,
        "pages": 10
    }
}
```

You can filter the results by mag_type and define in what page you want to be, as the limit per page is 1000 items

Method GET '/api/v1/features?mag_type=mw&page=1'

Response example:

```json
{
    "data": [
        {
            "id": 728,
            "type": "Feature",
            "attributes": {
                "external_id": "nc74030356",
                "magnitude": "3.2",
                "place": "3 km ESE of Berkeley, CA",
                "time": "1712427157070",
                "tsunami": false,
                "mag_type": "mw",
                "title": "M 3.2 - 3 km ESE of Berkeley, CA",
                "coordinates": {
                    "longitude": "-122.2423333",
                    "latitude": "37.8588333"
                }
            },
            "links": {
                "external_url": "https://earthquake.usgs.gov/earthquakes/eventpage/nc74030356"
            }
        },
        {
            "id": 1228,
            "type": "Feature",
            "attributes": {
                "external_id": "nc71133194",
                "magnitude": "4.42",
                "place": "6 km NW of Belden, CA",
                "time": "1712280889830",
                "tsunami": false,
                "mag_type": "mw",
                "title": "M 4.4 - 6 km NW of Belden, CA",
                "coordinates": {
                    "longitude": "-121.3006667",
                    "latitude": "40.04"
                }
            },
            "links": {
                "external_url": "https://earthquake.usgs.gov/earthquakes/eventpage/nc71133194"
            }
        },
        {
            "id": 1229,
            "type": "Feature",
            "attributes": {
                "external_id": "nc74029551",
                "magnitude": "4.08",
                "place": "6 km WNW of Belden, CA",
                "time": "1712280865410",
                "tsunami": false,
                "mag_type": "mw",
                "title": "M 4.1 - 6 km WNW of Belden, CA",
                "coordinates": {
                    "longitude": "-121.3163333",
                    "latitude": "40.0331667"
                }
            },
            "links": {
                "external_url": "https://earthquake.usgs.gov/earthquakes/eventpage/nc74029551"
            }
        },
        {
            "id": 7021,
            "type": "Feature",
            "attributes": {
                "external_id": "nc74018946",
                "magnitude": "3.89",
                "place": "36 km E of Hydesville, CA",
                "time": "1710687233380",
                "tsunami": false,
                "mag_type": "mw",
                "title": "M 3.9 - 36 km E of Hydesville, CA",
                "coordinates": {
                    "longitude": "-123.6748333",
                    "latitude": "40.5575"
                }
            },
            "links": {
                "external_url": "https://earthquake.usgs.gov/earthquakes/eventpage/nc74018946"
            }
        }
    ],
    "pagination": {
        "current_page": 1,
        "total": 4,
        "per_page": 1000,
        "pages": 1
    }
}
```

Method POST /api/v1/features/:feature_id/comments

Saves a comment in the designated feature

```json
{
    "data": {
        "body": "Test"
    }
}
```