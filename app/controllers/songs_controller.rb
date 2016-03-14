class SongsController < ApplicationController
  def index
  	@songs = Song.all
  	respond_to do |format|
  		render.html
  		render.json {render :json => @songs}
  	end

  end

  def show
  	#@songs =
  	respond_to do |format|
  		render.html
  		render.json {render :json => @songs}
  	end
  end
end
