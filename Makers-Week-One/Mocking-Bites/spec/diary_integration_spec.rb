require "diary"
require "secret_diary"

RSpec.describe 'integration' do 

  it 'does not read unlocked diary' do 
    diary = Diary.new("my_contents")
    secret_diary = SecretDiary.new(diary)
    expect { secret_diary.read }.to raise_error "Go away!"

  end 

  xit 'unlocks and reads diary' do 
    diary = Diary.new("my_contents")
    secret_diary = SecretDiary.new(diary)
    secret_diary.add
    expect { secret_diary.read }.to raise_error "Go away!"

  end 

end 