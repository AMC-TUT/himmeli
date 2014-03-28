require 'spec_helper'

describe "versions/new" do
  before(:each) do
    assign(:version, stub_model(Version,
      :hit_points => "",
      :target_speed => "",
      :rows => "",
      :columns => 1
    ).as_new_record)
  end

  it "renders new version form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", versions_path, "post" do
      assert_select "input#version_hit_points[name=?]", "version[hit_points]"
      assert_select "input#version_target_speed[name=?]", "version[target_speed]"
      assert_select "input#version_rows[name=?]", "version[rows]"
      assert_select "input#version_columns[name=?]", "version[columns]"
    end
  end
end
