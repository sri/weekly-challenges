#! /usr/bin/env ruby

class Node
  attr_accessor :value, :left, :right

  EMPTY = Object.new

  def initialize(value = EMPTY)
    @value = value
    @left  = nil
    @right = nil
  end

  def search(some_value)
    if some_value == value
      puts "found #{some_value}"
      self
    elsif some_value < value
      puts "#{some_value} < #{value} -- searching left child..."
      return nil if left.nil?
      left.search(some_value)
    else
      puts "#{some_value} > #{value} -- searching right child..."
      return nil if right.nil?
      right.search(some_value)
    end
  end

  def insert(new_value)
    if value == EMPTY
      self.value = new_value
    elsif new_value < value
      self.left ||= Node.new
      self.left.insert(new_value)
    else
      self.right ||= Node.new
      self.right.insert(new_value)
    end
  end
end

root = Node.new
(1..100).to_a.shuffle.each { |i| root.insert(i) }
root.search( (ARGV[0] || 101).to_i )
