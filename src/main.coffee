WIDTH = 800
HEIGHT = 600

CELL_COLUMNS = WIDTH / 10
CELL_ROWS = HEIGHT / 10

cells = null

preload = ->
  game.load.image 'cell', 'dist/assets/cell.jpg'

create = ->
  game.stage.backgroundColor = 0xFFFFFF

  cells = game.add.group()

  for y in [0...CELL_ROWS]
    for x in [0...CELL_COLUMNS]
      cells.create x * 10, y * 10, 'cell', 0, game.rnd.between(0, 20) is 0
      cells.getTop().toBeKilled = false
      cells.getTop().toBeReset = false

update = ->
  cells.forEach (cell) ->
    aliveNeighbors = 0
    aliveNeighbors++ for cellPosition in [
      cell.z - CELL_COLUMNS - 1,
      cell.z - CELL_COLUMNS,
      cell.z - CELL_COLUMNS + 1,
      cell.z - 1,
      cell.z + 1,
      cell.z + CELL_COLUMNS - 1,
      cell.z + CELL_COLUMNS,
      cell.z + CELL_COLUMNS + 1
    ] when cells.getAt(cellPosition)?.alive

    if cell.alive
      cell.toBeKilled = true if aliveNeighbors not in [2..3]
    else
      cell.toBeReset = true if aliveNeighbors is 3

  cells.forEach (cell) ->
    if cell.toBeKilled
      cell.kill()
      cell.toBeKilled = false
    else if cell.toBeReset
      cell.reset(cell.x, cell.y)
      cell.toBeReset = false

render = ->

game = new Phaser.Game 800, 600, Phaser.AUTO, '',
  preload: preload
  create: create
  update: update
  render: render
