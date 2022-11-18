require 'secret_diary'

RSpec.describe SecretDiary do 

  it "does not open diary" do
    
    diary = Diary.new(["my_contents1", "my_contents2"])
    secretdiary = SecretDiary.new(diary)
    expect { secretdiary.read }.to raise_error "Go away!"
  end 

  it "returns contents" do
    diary = double :diary, contents: ["my_contents1", "my_contents2"]
    secretdiary = SecretDiary.new(diary)
    expect(diary.contents).to eq ["my_contents1", "my_contents2"]
  end 

  it "unlocks diary" do
    diary = double :diary, contents: ["my_contents1", "my_contents2"]
    secretdiary = SecretDiary.new(diary)
    secretdiary.unlock
    expect(secretdiary.read).to eq ["my_contents1", "my_contents2"]
  end 

  it "unlocks then locks diary" do
    diary = double :diary, contents: ["my_contents1", "my_contents2"]
    secretdiary = SecretDiary.new(diary)
    secretdiary.unlock
    secretdiary.lock
    expect { secretdiary.read }.to raise_error "Go away!"
  end 
end 