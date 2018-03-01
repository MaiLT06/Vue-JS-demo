class UsersController < ApplicationController
  def index
    @users = User.all
    respond_to do |format|
      format.html
      format.json { render :json => @users }
    end 
  end

  def create
    @user = User.new(user_params)
    respond_to do |format|
      format.json do 
        if @user.save
          render :json => @user
        else
          render :json => { :errors => @user.errors.messages }, :status => 422
        end
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :age)
  end
end