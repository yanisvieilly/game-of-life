preload = ->
  game.load.image 'alive', 'dist/assets/alive.jpg'
  game.load.image 'dead', 'dist/assets/dead.jpg'

create = ->
  game.add.sprite 0, 0, 'dead'

update = ->

render = ->

game = new Phaser.Game 800, 600, Phaser.AUTO, '',
  preload: preload
  create: create
  update: update
  render: render
