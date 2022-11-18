require 'music_library'
require 'track'

RSpec.describe MusicLibrary do

  it "searches tracks by title" do 
    music_library = MusicLibrary.new
    track1 = double :track, matches?: true
    track2 = double :track, matches?: false
    track3 = double :track, matches?: true
    music_library.add(track1)
    music_library.add(track2)
    music_library.add(track3)
    expect(music_library.search("hello")). to eq [track1,track3]
  end 

  it "searches tracks by artist" do 
    music_library = MusicLibrary.new
    track1 = double :track, matches?: false
    track2 = double :track, matches?: true
    music_library.add(track1)
    music_library.add(track2)
    expect(music_library.search("Etta")). to eq [track2]
  end 

  
end