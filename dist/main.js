(function() {
  var CELL_COLUMNS, CELL_ROWS, HEIGHT, WIDTH, cells, create, game, preload, updateCells,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  WIDTH = 800;

  HEIGHT = 600;

  CELL_COLUMNS = WIDTH / 10;

  CELL_ROWS = HEIGHT / 10;

  cells = null;

  preload = function() {
    return game.load.image('cell', 'dist/assets/cell.jpg');
  };

  create = function() {
    var i, j, ref, ref1, x, y;
    game.stage.backgroundColor = 0xFFFFFF;
    cells = game.add.group();
    for (y = i = 0, ref = CELL_ROWS; 0 <= ref ? i < ref : i > ref; y = 0 <= ref ? ++i : --i) {
      for (x = j = 0, ref1 = CELL_COLUMNS; 0 <= ref1 ? j < ref1 : j > ref1; x = 0 <= ref1 ? ++j : --j) {
        cells.create(x * 10, y * 10, 'cell', 0, game.rnd.between(0, 20) === 0);
        cells.getTop().toBeKilled = false;
        cells.getTop().toBeReset = false;
      }
    }
    return game.time.events.loop(Phaser.Timer.SECOND, updateCells, this);
  };

  updateCells = function() {
    cells.forEach(function(cell) {
      var aliveNeighbors, cellPosition, i, len, ref, ref1;
      aliveNeighbors = 0;
      ref = [cell.z - CELL_COLUMNS - 1, cell.z - CELL_COLUMNS, cell.z - CELL_COLUMNS + 1, cell.z - 1, cell.z + 1, cell.z + CELL_COLUMNS - 1, cell.z + CELL_COLUMNS, cell.z + CELL_COLUMNS + 1];
      for (i = 0, len = ref.length; i < len; i++) {
        cellPosition = ref[i];
        if ((ref1 = cells.getAt(cellPosition - 1)) != null ? ref1.alive : void 0) {
          aliveNeighbors++;
        }
      }
      if (cell.alive) {
        if (indexOf.call([2, 3], aliveNeighbors) < 0) {
          return cell.toBeKilled = true;
        }
      } else {
        if (aliveNeighbors === 3) {
          return cell.toBeReset = true;
        }
      }
    });
    return cells.forEach(function(cell) {
      if (cell.toBeKilled) {
        cell.kill();
        return cell.toBeKilled = false;
      } else if (cell.toBeReset) {
        cell.reset(cell.x, cell.y);
        return cell.toBeReset = false;
      }
    });
  };

  game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create
  });

}).call(this);
