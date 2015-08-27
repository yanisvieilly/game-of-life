preload = ->
  game.load.image 'alive', 'dist/assets/alive.jpg'

create = ->
  game.stage.backgroundColor = 0xFFFFFF
  game.add.sprite 0, 0, 'alive'

update = ->

render = ->

game = new Phaser.Game 800, 600, Phaser.AUTO, '',
  preload: preload
  create: create
  update: update
  render: render
