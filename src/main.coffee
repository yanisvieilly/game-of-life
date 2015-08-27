preload = ->

create = ->
  graphics = game.add.graphics 0, 0

  graphics.beginFill 0xFFFFFF
  graphics.drawRect 0, 0, 10, 10
  graphics.endFill()

update = ->

render = ->

game = new Phaser.Game 800, 600, Phaser.AUTO, '',
  preload: preload
  create: create
  update: update
  render: render
