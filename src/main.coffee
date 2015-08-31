WIDTH = 800
HEIGHT = 600

CELL_COLUMNS = WIDTH / 10
CELL_ROWS = HEIGHT / 10

cells = null

createCells = ->
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

create = ->
  game.stage.backgroundColor = 0xFFFFFF

  createCells()

  game.time.events.loop Phaser.Timer.HALF, updateCells, @

getNeighborPositions = (cellIndex) ->
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

getAliveNeighbors = (cell) ->
  quantity = 0
  neighborPositions = getNeighborPositions cell.z
  for neighborPosition in neighborPositions when cells.getAt(neighborPosition - 1)?.alive
    break if ++quantity is 4
  quantity

killOrResetCells = (toBeKilled, toBeReset) ->
  cell.kill() for cell in toBeKilled
  cell.reset(cell.x, cell.y) for cell in toBeReset

updateCells = ->
  toBeKilled = []
  toBeReset = []

  for cell in cells.children
    aliveNeighbors = getAliveNeighbors cell

    if cell.alive
      toBeKilled.push cell if aliveNeighbors not in [2..3]
    else
      toBeReset.push cell if aliveNeighbors is 3

  killOrResetCells toBeKilled, toBeReset

game = new Phaser.Game 800, 600, Phaser.AUTO, '',
  create: create
