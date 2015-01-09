class CepsController < ApplicationController
  def index
    @ceps = Cep.all
  end

  def show
    @cep = Cep.find(params[:id])
  end

  def new
    @cep = Cep.new
  end

  def create
    @cep = Cep.new(params[:cep])

    if @cep.save
      redirect_to @cep
    else
      render :new
    end
  end
end
