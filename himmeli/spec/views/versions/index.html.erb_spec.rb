require 'spec_helper'

describe "versions/index" do
  before(:each) do
    assign(:versions, [
      stub_model(Version,
        :hit_points => "",
        :target_speed => "",
        :rows => "",
        :columns => 1
      ),
      stub_model(Version,
        :hit_points => "",
        :target_speed => "",
        :rows => "",
        :columns => 1
      )
    ])
  end

  it "renders a list of versions" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "".to_s, :count => 2
    assert_select "tr>td", :text => "".to_s, :count => 2
    assert_select "tr>td", :text => "".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
  end
end
