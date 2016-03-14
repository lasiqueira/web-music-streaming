class UsersController < ApplicationController
  def new
  	@user = User.new
  	respond_to do |format|
  		render.html
  		render.json {render :json => @user}
  	end
  end

  def create
  	@user = User.new(params[:user])
  	@user.save
  end
end
