class GameState
  attr_reader :board

  def initialize(moves)
    @moves = moves
    @board = make_board(moves)
  end

  def make_board(moves_string)
    board = Array.new(7){Array.new}
    moves_array = moves_string.split(',')

    moves_array.each do |move|
      color = move[0]
      column = move[1].to_i
      board[column].push(color)
    end
    return board
  end

  def is_move_valid?(move)
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
    
    true

  end

  def is_players_turn?(color)
    last_moves_color = @moves.split(',').last[0]
    if last_moves_color == color
      return false
    end

    true

  end


end