require "test_helper"
require_relative "../../app/services/game_state.rb"

class GameStateTest < ActiveSupport::TestCase

  def setup
    @test_state = GameState.new('R0,B0,R0,B0,R0,B0,R1,B1,R5,B5,R5,B4,R3,B2')
  end

  test "can create a gamestate object" do
    test_state = @test_state
    assert (test_state.class == GameState)
  end

  test "pieces are correctly placed" do
    correct_test_state = [
                          ['R', 'B', 'R', 'B', 'R', 'B' ],
                          ['R', 'B'],
                          ['B'],
                          ['R'],
                          ['B'],
                          ['R', 'B', 'R'],
                          []
                        ]
    assert(@test_state.board == correct_test_state)
  end

  test "properly detects an invalid move" do
    assert_raises('Given row has too many chips') {
      @test_state.is_move_valid?('R0')
    }
    assert_raises('Given row index is not between 0 and 6') {
      @test_state.is_move_valid?('R9')
    }
    assert_raises('Given player color is wrong color') {
      @test_state.is_move_valid?('B4')
    }
  end

  test "returns true if move is valid" do
    assert(@test_state.is_move_valid?('R4'))
  end

end