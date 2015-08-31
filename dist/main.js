(function() {
  var CELL_COLUMNS, CELL_ROWS, HEIGHT, WIDTH, cells, create, createCells, game, getAliveNeighbors, getNeighborPositions, killOrResetCells, updateCells,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  WIDTH = 800;

  HEIGHT = 600;

  CELL_COLUMNS = WIDTH / 10;

  CELL_ROWS = HEIGHT / 10;

  cells = null;

  createCells = function() {
    var cellBitmap, i, ref, results, x, y;
    cellBitmap = game.add.bitmapData(10, 10);
    cellBitmap.fill(0x00, 0x00, 0x00);
    cells = game.add.group();
    results = [];
    for (y = i = 0, ref = CELL_ROWS; 0 <= ref ? i < ref : i > ref; y = 0 <= ref ? ++i : --i) {
      results.push((function() {
        var j, ref1, results1;
        results1 = [];
        for (x = j = 0, ref1 = CELL_COLUMNS; 0 <= ref1 ? j < ref1 : j > ref1; x = 0 <= ref1 ? ++j : --j) {
          results1.push(cells.create(x * 10, y * 10, cellBitmap, 0, game.rnd.between(0, 20) === 0));
        }
        return results1;
      })());
    }
    return results;
  };

  create = function() {
    game.stage.backgroundColor = 0xFFFFFF;
    createCells();
    return game.time.events.loop(Phaser.Timer.HALF, updateCells, this);
  };

  getNeighborPositions = function(cellIndex) {
    return [cellIndex - CELL_COLUMNS - 1, cellIndex - CELL_COLUMNS, cellIndex - CELL_COLUMNS + 1, cellIndex - 1, cellIndex + 1, cellIndex + CELL_COLUMNS - 1, cellIndex + CELL_COLUMNS, cellIndex + CELL_COLUMNS + 1];
  };

  getAliveNeighbors = function(cell) {
    var i, len, neighborPosition, neighborPositions, quantity, ref;
    quantity = 0;
    neighborPositions = getNeighborPositions(cell.z);
    for (i = 0, len = neighborPositions.length; i < len; i++) {
      neighborPosition = neighborPositions[i];
      if ((ref = cells.getAt(neighborPosition - 1)) != null ? ref.alive : void 0) {
        if (++quantity === 4) {
          break;
        }
      }
    }
    return quantity;
  };

  killOrResetCells = function(toBeKilled, toBeReset) {
    var cell, i, j, len, len1, results;
    for (i = 0, len = toBeKilled.length; i < len; i++) {
      cell = toBeKilled[i];
      cell.kill();
    }
    results = [];
    for (j = 0, len1 = toBeReset.length; j < len1; j++) {
      cell = toBeReset[j];
      results.push(cell.reset(cell.x, cell.y));
    }
    return results;
  };

  updateCells = function() {
    var aliveNeighbors, cell, i, len, ref, toBeKilled, toBeReset;
    toBeKilled = [];
    toBeReset = [];
    ref = cells.children;
    for (i = 0, len = ref.length; i < len; i++) {
      cell = ref[i];
      aliveNeighbors = getAliveNeighbors(cell);
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
    return killOrResetCells(toBeKilled, toBeReset);
  };

  game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    create: create
  });

}).call(this);
