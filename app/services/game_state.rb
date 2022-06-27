class GameState
  attr_reader :board, :moves

  def initialize(game, moves, new_move)
    @game = game

    if @game.status == "host_turn"
      prefix = "h"
    elsif game.status == "joining_turn"
      prefix = "j"
    end

    @moves = moves
    @new_move = prefix + new_move.to_s
    @board = make_board(moves)
  end

  
    # Checks if a move is valid, then adds it.
  def handle_turn
    if is_move_valid?
      add_new_move(@new_move)
    end
  end
  
    # Checks for a winner
  def is_a_winner?
    return horizontal_win? || vertical_win? || diagonal_win? || antidiagonal_win?
  end

    # Creates a 2D array out of a string of moves.
  def make_board(moves_string)
    board = Array.new(7){Array.new}
    moves_array = moves_string.split(',', -1)
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
    # if !is_players_turn?(move[0])
    #   raise 'Given player color is the wrong color'
    #   return false
    # end
    return true
  end

    # Checks if the given color is different than the previous turn.
  def is_players_turn?(color = @new_move[0])
    if @moves == ""
      return true
    end
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

    # Adds the @new_move to the @moves list. Then rebuilds the @board.
  def add_new_move(move = @new_move) 
    @moves = @moves.split(',').push(move).join(',')
    # @moves << ',' << move
    @board = make_board(@moves)
  end

  ###! Solving for winner logic below this point ###


  def horizontal_win? # —
    color, column = @new_move[0], @new_move[1].to_i
    row = (@board[column].length - 1)
    left_most_column = column
    
    while (@board[left_most_column][row] == color)
      break if @board[left_most_column - 1][row] != color
      left_most_column -= 1
    end

    return false if left_most_column >= 4 #guards against using [] against a column that doesn't exist.

    first = @board[left_most_column][row]
    second = @board[left_most_column + 1][row]
    third = @board[left_most_column + 2][row]
    fourth = @board[left_most_column + 3][row]

    return true if first == color && second == color && third == color && fourth == color
    return false
  end

  def vertical_win? # |

    color, column = @new_move[0], @new_move[1].to_i
    row = (@board[column].length - 1)

    return false if row <= 2

    first = @board[column][row]
    second = @board[column][row - 1]
    third = @board[column][row - 2]
    fourth = @board[column][row - 3]

    return true if first == color && second == color && third == color && fourth == color
    return false
  end


    def diagonal_win? # \

      color, column = @new_move[0], @new_move[1].to_i
      row = (@board[column].length - 1)
      left_most_column = column
      top_most_row = row
      

      while (@board[left_most_column][top_most_row] == color)
        break if left_most_column <= 0
        break if @board[left_most_column - 1][top_most_row + 1] != color
        left_most_column -= 1
        top_most_row += 1
      end
  
      return false if left_most_column >= 4 || top_most_row <= 2

      first = @board[left_most_column][top_most_row]
      second = @board[left_most_column + 1][top_most_row - 1]
      third = @board[left_most_column + 2][top_most_row - 2] 
      fourth = @board[left_most_column + 3][top_most_row - 3]
  
      return true if first == color && second == color && third == color && fourth == color
      return false
    end


  def antidiagonal_win? # /

    color, column = @new_move[0], @new_move[1].to_i
    row = (@board[column].length - 1)
    right_most_column = column
    top_most_row = row
    

    while (@board[right_most_column][top_most_row] == color)
      break if right_most_column >= 6
      break if @board[right_most_column + 1][top_most_row + 1] != color
      right_most_column += 1
      top_most_row += 1
    end

    return false if right_most_column <= 2 || top_most_row <= 2

    first = @board[right_most_column][top_most_row]
    second = @board[right_most_column - 1][top_most_row - 1]
    third = @board[right_most_column - 2][top_most_row - 2]
    fourth = @board[right_most_column - 3][top_most_row - 3]

    return true if first == color && second == color && third == color && fourth == color
    return false

  end
end