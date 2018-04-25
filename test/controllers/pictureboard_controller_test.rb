require 'test_helper'

class PictureboardControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pictureboard_index_url
    assert_response :success
  end

end
