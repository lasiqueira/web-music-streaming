# SISINTTCC

Music streaming Web API written in Ruby/RoR.

Tech stack:

* Ruby

* Ruby on Rails

* Amazon Webservices (S3)

* Sqlite/Postgresql


The objective of this project is learning and using it as a school project.

## Installation
* `bundle install`
* `rake db:create`
* `rake db:migrate`
* `rake db:seed`
* `rails s`

## Usage

This backend API was made to be used alongside a separate frontend app. But you can run the GET/POST/PUT/DELETE manually if you wish so. You can make most of the calls without a user token. The only calls you need the token is for /playlists. You should send the token in the request header as `Authorization: token`. The response for the API calls is in the JSON format.

The songs are stored in AWS S3. When running the app locally, you must have a `.env` file in the root of the app with the following:

```
export S3_BUCKET= yourbucket
export AWS_KEY= yourawskey
export AWS_SECRET= yourawssecret
```
Alternatively, you can have those as environment variables.

The songs must be stored in the root of your bucket and be in the `.mp3` format. You must seed your db manually or make a script to get the songs from S3 and parse the information before inserting in the database. In the `db/seeds.rb` there is an example of how you should insert the songs in the database.
