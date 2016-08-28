require 'minitest/autorun'
require 'stringio'

require_relative './draw-lines'

class PPMTest < Minitest::Test
  def test_empty_image
    io = StringIO.new
    PPM.new(Image.new(0, 0)).output!(io)

    assert_equal io.string, "P3\n0 0\n255\n"
  end

  def test_small_image
    io = StringIO.new
    PPM.new(Image.new(2, 2)).output!(io)

    assert_equal io.string, %{P3
2 2
255
  0   0   0     0   0   0
  0   0   0     0   0   0
}
  end
end
