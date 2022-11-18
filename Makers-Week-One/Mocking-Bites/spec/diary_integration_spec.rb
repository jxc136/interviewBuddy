require "diary"
require "secret_diary"

RSpec.describe 'integration' do 

  it 'does not read unlocked diary' do 
    diary = Diary.new("my_contents")
    secret_diary = SecretDiary.new(diary)
    expect { secret_diary.read }.to raise_error "Go away!"

  end 

  it 'unlocks and reads diary' do 
    diary = Diary.new("my_contents")
    secret_diary = SecretDiary.new(diary)
    secret_diary.unlock
    expect(secret_diary.read).to eq "my_contents"
  end 

end 