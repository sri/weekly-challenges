#! /usr/bin/env ruby

Point = Struct.new(:x, :y)

class Color
  attr_accessor :r, :g, :b

  def initialize(r = 0, g = 0, b = 0)
    @r, @g, @b = r, g, b
  end

  BLACK = new(0, 0, 0)
  WHITE = new(255, 255, 255)
  RED   = new(255, 0, 0)
  GREEN = new(0, 255, 0)
  BLUE  = new(0, 0, 255)

  def self.random
    Color.new(rand(255), rand(255), rand(255))
  end
end

class Pixel
  attr_accessor :color

  def initialize(color = Color::BLACK)
    @color = color
  end

  def to_s
    "%3s %3s %3s" % [@color.r, @color.g, @color.b]
  end
end

class Image
  attr_accessor :pixels, :width, :height

  def initialize(width, height)
    @width = width
    @height = height

    @pixels = (0...height).map do |i|
      (0...width).map { |j| Pixel.new }
    end
  end

  def random_point
    Point.new rand(width), rand(height)
  end

  def each_row
    pixels.each do |row|
      yield row
    end
  end

  def draw_at(point, new_color)
    @pixels[point.y][point.x].color = new_color
  end

  def draw_random_line
    draw_line(
      random_point,
      random_point,
      Color.random)
  end

  # From https://rosettacode.org/wiki/Bitmap/Bresenham%27s_line_algorithm#Ruby
  def draw_line(start_point, end_point, color)
    x1, y1 = start_point.x, start_point.y
    x2, y2 = end_point.x, end_point.y

    steep = (y2 - y1).abs > (x2 - x1).abs

    if steep
      x1, y1 = y1, x1
      x2, y2 = y2, x2
    end

    if x1 > x2
      x1, x2 = x2, x1
      y1, y2 = y2, y1
    end

    deltax = x2 - x1
    deltay = (y2 - y1).abs
    error = deltax / 2
    ystep = y1 < y2 ? 1 : -1

    y = y1
    x1.upto(x2) do |x|
      point = steep ? Point.new(y, x) : Point.new(x, y)

      draw_at(point, color)

      error -= deltay
      if error < 0
        y += ystep
        error += deltax
      end
    end
  end
end

class PPM
  attr_accessor :image

  def initialize(image)
    @image = image
  end

  def output!(out = $stdout)
    out.puts "P3"
    out.puts "#{image.width} #{image.height}"
    out.puts "255"

    @image.each_row do |pixels|
      puts pixels.map(&:to_s).join('   ')
    end
  end
end

def main
  width  = 100
  height = 100
  image  = Image.new(width, height)

  10.times do
    image.draw_random_line
  end

  PPM.new(image).output!
end

if $0 == __FILE__
  main
end
