require 'spec_helper'

describe "events/new" do
  before(:each) do
    assign(:event, stub_model(Event,
      :person => nil,
      :duration => 1,
      :level => 1,
      :scores => 1
    ).as_new_record)
  end

  it "renders new event form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", events_path, "post" do
      assert_select "input#event_person[name=?]", "event[person]"
      assert_select "input#event_duration[name=?]", "event[duration]"
      assert_select "input#event_level[name=?]", "event[level]"
      assert_select "input#event_scores[name=?]", "event[scores]"
    end
  end
end
