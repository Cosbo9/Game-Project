class GameState
  attr_reader :board

  def initialize(moves, new_move)
    @moves = moves
    @new_move = new_move
    @board = make_board(moves)
  end

    # Creates a 2D array out of a string of moves.
  def make_board(moves_string)
    board = Array.new(7){Array.new}
    moves_array = moves_string.split(',')
    moves_array.each do |move|
      color, column = move[0], move[1].to_i
      board[column].push(color)
    end
    return board
  end

    # Checks if the given move is allowed to be played. 
  def is_move_valid?(move = @new_move) #defaults to given move, but allows hypothetical checks
    column = move[1].to_i
    if !column.between?(0, 6)
      raise 'Given row index is not between 0 and 6'
      return false
    end
    if @board[column].length >= 6
      raise 'Given row has too many chips'
      return false
    end
    if !is_players_turn?(move[0])
      raise 'Given player color is the wrong color'
      return false
    end
    return true
  end

    # Checks if the given color is different than the previous turn.
  def is_players_turn?(color = @new_move[0])
    last_moves_color = @moves.split(',').last[0]
    if last_moves_color == color
      return false
    end
    return true
  end

      # Checks if the game board is full.
  def is_board_full?
    @board.each do |column|
      next if column.length >= 6 # skips the iteration if the column is full
      return false
    end
    return true
  end

end