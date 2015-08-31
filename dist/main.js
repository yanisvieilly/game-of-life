(function() {
  var CELL_COLUMNS, CELL_ROWS, HEIGHT, WIDTH, cells, create, game, neighboringPositions, updateCells,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  WIDTH = 800;

  HEIGHT = 600;

  CELL_COLUMNS = WIDTH / 10;

  CELL_ROWS = HEIGHT / 10;

  cells = null;

  create = function() {
    var cellBitmap, i, j, ref, ref1, x, y;
    game.stage.backgroundColor = 0xFFFFFF;
    cellBitmap = game.add.bitmapData(10, 10);
    cellBitmap.fill(0x00, 0x00, 0x00);
    cells = game.add.group();
    for (y = i = 0, ref = CELL_ROWS; 0 <= ref ? i < ref : i > ref; y = 0 <= ref ? ++i : --i) {
      for (x = j = 0, ref1 = CELL_COLUMNS; 0 <= ref1 ? j < ref1 : j > ref1; x = 0 <= ref1 ? ++j : --j) {
        cells.create(x * 10, y * 10, cellBitmap, 0, game.rnd.between(0, 20) === 0);
        cells.getTop().toBeKilled = false;
        cells.getTop().toBeReset = false;
      }
    }
    return game.time.events.loop(Phaser.Timer.HALF, updateCells, this);
  };

  neighboringPositions = function(cellIndex) {
    return [cellIndex - CELL_COLUMNS - 1, cellIndex - CELL_COLUMNS, cellIndex - CELL_COLUMNS + 1, cellIndex - 1, cellIndex + 1, cellIndex + CELL_COLUMNS - 1, cellIndex + CELL_COLUMNS, cellIndex + CELL_COLUMNS + 1];
  };

  updateCells = function() {
    var aliveNeighbors, cell, i, j, k, l, len, len1, len2, len3, neighborPosition, neighborPositions, ref, ref1, results, toBeKilled, toBeReset;
    toBeKilled = [];
    toBeReset = [];
    ref = cells.children;
    for (i = 0, len = ref.length; i < len; i++) {
      cell = ref[i];
      aliveNeighbors = 0;
      neighborPositions = neighboringPositions(cell.z);
      for (j = 0, len1 = neighborPositions.length; j < len1; j++) {
        neighborPosition = neighborPositions[j];
        if ((ref1 = cells.getAt(neighborPosition - 1)) != null ? ref1.alive : void 0) {
          if (++aliveNeighbors === 4) {
            break;
          }
        }
      }
      if (cell.alive) {
        if (indexOf.call([2, 3], aliveNeighbors) < 0) {
          toBeKilled.push(cell);
        }
      } else {
        if (aliveNeighbors === 3) {
          toBeReset.push(cell);
        }
      }
    }
    for (k = 0, len2 = toBeKilled.length; k < len2; k++) {
      cell = toBeKilled[k];
      cell.kill();
    }
    results = [];
    for (l = 0, len3 = toBeReset.length; l < len3; l++) {
      cell = toBeReset[l];
      results.push(cell.reset(cell.x, cell.y));
    }
    return results;
  };

  game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    create: create
  });

}).call(this);
