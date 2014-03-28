require 'spec_helper'

describe "versions/show" do
  before(:each) do
    @version = assign(:version, stub_model(Version,
      :hit_points => "",
      :target_speed => "",
      :rows => "",
      :columns => 1
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(//)
    rendered.should match(//)
    rendered.should match(//)
    rendered.should match(/1/)
  end
end
