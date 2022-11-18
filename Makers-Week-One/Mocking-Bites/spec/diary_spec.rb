require 'diary'

RSpec.describe Diary do 

  it "returns contents" do
    diary = Diary.new(["my_contents1", "my_contents2"])
    expect(diary.contents).to eq ["my_contents1", "my_contents2"]
  end 
end 