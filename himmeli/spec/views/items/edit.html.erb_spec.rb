require 'spec_helper'

describe "items/edit" do
  before(:each) do
    @item = assign(:item, stub_model(Item,
      :event => nil,
      :duration => 1,
      :answer => false
    ))
  end

  it "renders the edit item form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", item_path(@item), "post" do
      assert_select "input#item_event[name=?]", "item[event]"
      assert_select "input#item_duration[name=?]", "item[duration]"
      assert_select "input#item_answer[name=?]", "item[answer]"
    end
  end
end
