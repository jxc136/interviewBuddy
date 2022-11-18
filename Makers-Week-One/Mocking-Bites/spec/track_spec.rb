require 'track'

RSpec.describe Track do

  it 'matches when given a keyword in the title' do 

    track = Track.new("Hello", "Adele")
    expect(track.matches?("Hello")).to eq true

  end 

  it 'matches when given a keyword in the artist' do 

    track = Track.new("Hello", "Adele")
    expect(track.matches?("Adele")).to eq true

  end 
end 