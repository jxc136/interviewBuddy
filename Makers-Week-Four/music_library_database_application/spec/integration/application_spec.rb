require "spec_helper"
require "rack/test"
require_relative '../../app'

def reset_artist_tables
  seed_sql = File.read('spec/seeds/artists_seeds.sql')
  connection = PG.connect({ host: '127.0.0.1', dbname: 'music_library_test' })
  connection.exec(seed_sql)
end

def reset_albums_tables
  seed_sql = File.read('spec/seeds/albums_seeds.sql')
  connection = PG.connect({ host: '127.0.0.1', dbname: 'music_library_test' })
  connection.exec(seed_sql)
end

describe Application do
  before(:each) do 
    reset_artist_tables
    reset_albums_tables
  end
  include Rack::Test::Methods
  let(:app) { Application.new }


  context "GET /artists/new" do
    it 'returns the form page' do 
      response = get('/artists/new')
      expect(response.status).to eq(200)
      expect(response.body).to include('<h1>Add a new artist</h1>')
      expect(response.body).to include('<form method="POST" action="/artists">')
      expect(response.body).to include('<input type="text" name="name"/>')
      expect(response.body).to include('<input type="text" name="genre"/>')
      expect(response.body).to include('<input type="submit">')

    end 
  end 

  context "post /artists" do
    it 'creates a new artist and return a confirmation page' do

      response = post('/artists', name: "Oasis", genre: "Indie")
      expect(response.status).to eq(200)
      expect(response.body).to include('<h1>New artist created: Oasis</h1>')
      artists = ArtistRepository.new
      last_artist = artists.all.last
      expect(last_artist.name).to eq 'Oasis'
      expect(last_artist.genre).to eq "Indie"
    end 
  end

  context "GET /albums/new" do
    it 'returns the form page' do 
      response = get('/albums/new')
      expect(response.status).to eq(200)
      expect(response.body).to include('<h1>Add a new album</h1>')
      expect(response.body).to include('<form method="POST" action="/albums">')
      expect(response.body).to include('<input type="text" name="title"/>')
      expect(response.body).to include('<input type="text" name="release_year"/>')
      expect(response.body).to include('<input type="text" name="artist_id"/>')
      expect(response.body).to include('<input type="submit">')


    end 
  end 
  context "post /albums" do
    it 'creates a new album and return a confirmation page' do

      response = post('/albums', title: "Midnights", release_year: "2022", artist_id: "3" )
      expect(response.status).to eq(200)
      expect(response.body).to include('<h1>New album created: Midnights</h1>')
      albums = AlbumRepository.new
      last_album = albums.all.last
      expect(last_album.title).to eq 'Midnights'
      expect(last_album.release_year).to eq "2022"
      expect(last_album.artist_id).to eq 3
    end 

    it 'creates another new album and return a confirmation page' do

      response = post('/albums', title: "Evermore", release_year: "2020", artist_id: "3" )
      expect(response.status).to eq(200)
      expect(response.body).to include('<h1>New album created: Evermore</h1>')
    end 
  end

  context "POST /artists" do
    it 'create a new artist object in database' do
      response = post('/artists', name: "Wild nothing", genre: "Indie")
      expect(response.status).to eq(200)
      
    # Checking artist has been created 
      artist_check = get('/artists')
      expect(artist_check.body).to include('Wild nothing')
      artists = ArtistRepository.new
      last_artist = artists.all.last
      expect(last_artist.name).to eq 'Wild nothing'
      expect(last_artist.id).to eq 5
      expect(last_artist.genre).to eq 'Indie'
   
    end
  end

  context 'GET /albums/:id' do
    it 'returns an album object by param id' do
      response = get('/albums/2')

      expect(response.status).to eq(200)
      expect(response.body).to include('Surfer Rosa')
      expect(response.body).to include('Release year: 1988')
      expect(response.body).to include('Artist: Pixies')
  
    end
  end


  it 'lists all albums with links to album page' do 

    response = get('/albums')

    expect(response.status).to eq(200)
    expect(response.body).to include('<a href="/albums/2">Surfer Rosa</a>')
    expect(response.body).to include('<a href="/albums/3">Waterloo</a>')
    expect(response.body).to include('<a href="/albums/11">Fodder on My Wings</a>')


  end 

  context "GET /artists" do
    it 'returns a list of artists with links to id' do
      response = get('/artists')

      expect(response.status).to eq(200)
      expect(response.body).to include('<a href="/artists/1">Pixies</a> 
        Genre: Rock')
      
      expect(response.body).to include('<a href="/artists/2">ABBA</a> 
        Genre: Pop')
      expect(response.body).to include('<a href="/artists/3">Taylor Swift</a>')
      expect(response.body).to include('<a href="/artists/4">Nina Simone</a>')
     
    end
  end
  context 'GET /artists/:id' do
    it 'returns an artist object by param id' do
      response = get('/artists/1')

      expect(response.status).to eq(200)
      expect(response.body).to include('<h1>Pixies</a> </h1>')
      expect(response.body).to include('<p>Genre: Rock</p>')
      expect(response.body).to include('<a href="/albums/1">Doolittle</a>')
      expect(response.body).to include('Released: 1989')
      expect(response.body).to include('<a href="/albums/2">Surfer Rosa</a>')
      expect(response.body).to include('Released: 1988')
      expect(response.body).to include('<a href="/albums/5">Bossanova</a>')
      expect(response.body).to include('Released: 1990')
    
    end
  end
  
  
end
