RSpec.describe "doubles challenge" do
  it "creates a sophisticated double" do
    task = double :task
    task_list = double :task_list, list: [task], count: 1, clear: :success, add: nil

    allow(task_list).to receive(:add)
    

    # Set up this double to pass the tests below
    # ...

    # allow(fake_diary).to receive(:add).with(:diary_entry)

    # Don't edit below
    task_list.add(task)
    expect(task_list.list).to eq [task]
    expect(task_list.count).to eq 1
    expect(task_list.clear).to eq :success
  end
end