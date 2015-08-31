WIDTH = 800
HEIGHT = 600

CELL_COLUMNS = WIDTH / 10
CELL_ROWS = HEIGHT / 10

cells = null

create = ->
  game.stage.backgroundColor = 0xFFFFFF

  cellBitmap = game.add.bitmapData 10, 10
  cellBitmap.fill 0x00, 0x00, 0x00

  cells = game.add.group()

  for y in [0...CELL_ROWS]
    for x in [0...CELL_COLUMNS]
      # Randomized
      cells.create x * 10, y * 10, cellBitmap, 0, game.rnd.between(0, 20) is 0
      # Glider spaceship starting on the top left corner
      # cells.create x * 10, y * 10, cellBitmap, 0,
      #   (y == 0 && x == 2) || (y == 1 && x == 0) || (y == 1 && x == 2) ||
      #   (y == 2 && x == 1) || (y == 2 && x == 2)
      cells.getTop().toBeKilled = false
      cells.getTop().toBeReset = false

  game.time.events.loop Phaser.Timer.HALF, updateCells, @

neighboringPositions = (cellIndex) ->
  [
    cellIndex - CELL_COLUMNS - 1,
    cellIndex - CELL_COLUMNS,
    cellIndex - CELL_COLUMNS + 1,
    cellIndex - 1,
    cellIndex + 1,
    cellIndex + CELL_COLUMNS - 1,
    cellIndex + CELL_COLUMNS,
    cellIndex + CELL_COLUMNS + 1
  ]

updateCells = ->
  toBeKilled = []
  toBeReset = []

  cells.forEach (cell) ->
    aliveNeighbors = 0
    neighborPositions = neighboringPositions cell.z
    for neighborPosition in neighborPositions when cells.getAt(neighborPosition - 1)?.alive
      break if ++aliveNeighbors is 4

    if cell.alive
      toBeKilled.push cell if aliveNeighbors not in [2..3]
    else
      toBeReset.push cell if aliveNeighbors is 3

  toBeKilled.forEach (cell) -> cell.kill()
  toBeReset.forEach (cell) -> cell.reset(cell.x, cell.y)

game = new Phaser.Game 800, 600, Phaser.AUTO, '',
  create: create
