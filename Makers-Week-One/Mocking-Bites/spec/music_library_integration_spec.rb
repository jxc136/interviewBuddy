require 'music_library'
require 'track'

RSpec.describe "integration" do

  it 'returns empty list when no tracks' do
    music_library = MusicLibrary.new
    expect(music_library.all).to eq []

  end 

  it 'returns a track when one is added' do
    music_library = MusicLibrary.new
    track1 = Track.new("title","artist")
    music_library.add(track1)
    expect(music_library.all).to eq [track1]
    track2 = Track.new("wonderwall","oasis")
    music_library.add(track2)
    expect(music_library.all).to eq [track1,track2]

  end 

  it 'returns empty list when no tracks' do
    music_library = MusicLibrary.new
    expect(music_library.all).to eq []

  end 

  it 'returns all tracks matching keyword' do
    music_library = MusicLibrary.new
    track1 = Track.new("title","artist")
    music_library.add(track1)
    expect(music_library.all).to eq [track1]
    track2 = Track.new("wonderwall","oasis")
    music_library.add(track2)
    track3 = Track.new("live forever","oasis")
    music_library.add(track3)
    expect(music_library.search("oasis")).to eq [track2,track3]

  end 

end

