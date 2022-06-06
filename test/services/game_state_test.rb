require "test_helper"
require_relative "../../app/services/game_state.rb"

class GameStateTest < ActiveSupport::TestCase

  def setup
    @test_state = GameState.new('R0,B0,R0,B0,R0,B0,R1,B1,R5,B5,R5,B4,R3,B2', 'R4')
  end
  
  test "can create a gamestate object" do
    assert_instance_of(GameState, @test_state)
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
  
  test "returns true if move is valid, given and default" do
    assert(@test_state.is_move_valid?('R4'))
    assert(@test_state.is_move_valid?)
  end
  
  test "returns false if board is not full" do
    assert_not(@test_state.is_board_full?)
  end
  
  test "returns true if board is full" do
    full_test_state = GameState.new('R0,B0,R0,B0,R0,B0,R1,B1,R1,B1,R1,B1,R2,B2,R2,B2,R2,B2,R3,B3,R3,B3,R3,B3,R4,B4,R4,B4,R4,B4,R5,B5,R5,B5,R5,B5,R6,B6,R6,B6,R6,B6', 'R1')
    assert(full_test_state.is_board_full?)
  end
  
  ###! Tests for winner logic below this line ###
  
  ## Horizontal tests ##
  test "detects horizontal wins when piece placed on end" do
    hori_test = GameState.new('R0,B0,R1,B1,R2,B2', 'R3')
    hori_test.add_new_move
    assert(hori_test.horizontal_win?)
  end

  test "detects horizontal win when piece placed at beginning" do
    hori_test = GameState.new('R1,B1,R2,B2,R3,B3', 'R0')
    hori_test.add_new_move
    assert(hori_test.horizontal_win?)
  end

  test "detects horizontal win when piece placed in middle" do
    hori_test = GameState.new('R1,B1,R3,B3,R4,B4', 'R2')
    hori_test.add_new_move
    assert(hori_test.horizontal_win?)
  end

  test "horizontal check doesn't have false positive" do
    hori_test = GameState.new('R1,B1,R3,B3,R4,B4', 'R6')
    hori_test.add_new_move
    assert_not(hori_test.horizontal_win?)
  end

                    ## Vertical tests ##
  test "detects vertical wins when piece is placed " do
    verti_test = GameState.new('R0,B1,R0,B1,R0,B1', 'R0')
    verti_test.add_new_move
    assert(verti_test.vertical_win?)
  end

  test "vertical check doesn't have false positive" do
    verti_test = GameState.new('R0,B1,R0,B1,R0,B1', 'R5')
    verti_test.add_new_move
    assert_not(verti_test.vertical_win?)
  end

                    ## Diagonal tests ##
  test "detects diagonal wins when piece placed at beginning" do
    diag_test = GameState.new('R0,B0,R0,B1,R1,B2,R1,B4,R2,B5,R3', 'R0')
    diag_test.add_new_move
    assert(diag_test.diagonal_win?)
  end

  test "detects diagonal win when piece placed at end" do
    diag_test = GameState.new('R0,B0,R1,B0,R0,B1,R1,B2,R2,B4', 'R3')
    diag_test.add_new_move
    assert(diag_test.diagonal_win?)
  end

  test "detects diagonal win when piece placed in middle" do
    diag_test = GameState.new('R0,B0,R1,B0,R0,B1,R3,B2,R2', 'R1')
    diag_test.add_new_move
    assert(diag_test.diagonal_win?)
  end

  test "diagonal check doesn't have false positive" do
    diag_test = GameState.new('R5,B0,R0,B2,R2,B2,R2,B2,R2,B3,R3,B3,R3,B4,R3', 'R1')
    diag_test.add_new_move
    assert_not(diag_test.diagonal_win?)
  end

                  ## Antidiagonal tests ##
  test "detects antidiagonal wins when piece placed at beginning" do
    antidiag_test = GameState.new('R0,B1,R1,B2,R3,B2,R2,B3,R4,B3', 'R3')
    antidiag_test.add_new_move
    assert(antidiag_test.antidiagonal_win?)
  end

  test "detects antidiagonal win when piece placed at end" do
    antidiag_test = GameState.new('R2,B1,R1,B3,R3,B3,R3,B2,R2,B4', 'R0')
    antidiag_test.add_new_move
    assert(antidiag_test.antidiagonal_win?)
  end

  test "detects antidiagonal win when piece placed in middle" do
    antidiag_test = GameState.new('R0,B1,R1,B2,R3,B2,R3,B3,R3,B4', 'R2')
    antidiag_test.add_new_move
    assert(antidiag_test.antidiagonal_win?)
  end

  test "antidiagonal check doesn't have false positive" do
    antidiag_test = GameState.new('R1,B1,R3,B3,R4,B4', 'R1')
    antidiag_test.add_new_move
    assert_not(antidiag_test.antidiagonal_win?)
  end

    test "a winner is detected" do
      win_test =  GameState.new('R0,B5,R1,B6,R3,B5', 'R2')
      win_test.add_new_move
      assert(win_test.is_a_winner?)
    end

    test "a winner is not detected if there is no winner" do
      win_test =  GameState.new('R0,B5,R1,B6,R3,B5', 'R6')
      win_test.add_new_move
      assert_not(win_test.is_a_winner?)
    end
end