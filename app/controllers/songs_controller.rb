class SongsController < ApplicationController
  def index
  	@songs = S3_BUCKET.objects
  end
end
