# file: app.rb
require 'sinatra'
require "sinatra/reloader"
require_relative 'lib/database_connection'
require_relative 'lib/album_repository'
require_relative 'lib/artist_repository'


DatabaseConnection.connect

class Application < Sinatra::Base
  configure :development do
    register Sinatra::Reloader
    also_reload 'lib/album_repository'
    also_reload 'lib/artist_repository'
  end

  get "/artists/new" do 

    return erb(:new_artist_form)
  end 

  post '/artists' do 

    artist_repo = ArtistRepository.new 
    new_artist = Artist.new 
    new_artist.name = params[:name]
    new_artist.genre = params[:genre]
    artist_repo.create(new_artist)
    @artist_name = new_artist.name
    return erb(:new_artist_created)

  end 

  get "/albums/new" do 

    return erb(:new_album_form)
  end 

  post '/albums' do 
    repo = AlbumRepository.new
    new_album = Album.new
    new_album.title = params[:title]
    new_album.release_year = params[:release_year]
    new_album.artist_id = params[:artist_id]
    repo.create(new_album)
    @album_name = new_album.title

    return erb(:new_album_created)
  end   

  get '/artists' do 

    repo = ArtistRepository.new
    @artists = repo.all

    return erb(:artists)

  end

  get '/artists/:id' do
    album_repo = AlbumRepository.new
    artist_repo = ArtistRepository.new
    @artist = artist_repo.find(params[:id])

    @albums = album_repo.all
    return erb(:artist)

  end 

  

  get '/albums/:id' do
    album_repo = AlbumRepository.new
    artist_repo = ArtistRepository.new
    @album = album_repo.find(params[:id])
    @artist = artist_repo.find(@album.artist_id)
    return erb(:album)

  end 

  get '/albums' do 

    repo = AlbumRepository.new
    @albums = repo.all

    return erb(:albums)

  end

  
end