var events = {
  bike: 0
}

var assets = {
  envir: [{
    name: 'BG.png',
    screen: [1, 2],
    type: 'still',
    vis: 1,
    pos: [0, 0]
  }, {
    name: 'water.png',
    screen: [1],
    type: 'still',
    vis: 1,
    pos: [-20, 1080 - 915]
  }, {
    name: 'water_grey.png',
    screen: [1],
    type: 'waterFx',
    vis: 1,
    pos: [-20, 1080 - 915]
  }, {
    name: 'oxyMachine.png',
    screen: [1],
    type: ['buttonMult', 'buttonMult', 'buttonMult', 'buttonMult', 'buttonMult'],
    mult: 3,
    turnedOn: [0, 0, 0],
    vis: [
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0]
    ],
    pos: [
      [755, 245],
      [625, 695],
      [25, 435]
    ]
  }, {
    name: 'house_0.png',
    screen: [1],
    type: 'still',
    vis: 1,
    pos: [0, 0]
  }, {
    name: 'agent.png',
    screen: [1],
    type: 'button',
    vis: 0,
    pos: [1360, 18]
  }, {
    name: 'lanyi.png',
    screen: [1],
    type: 'button',
    vis: 0,
    pos: [1370, 45]
  }, {
    name: 'house_1.png',
    screen: [2],
    type: 'still',
    vis: 1,
    pos: [0, 0]
  }, {
    name: 'grass_2.png',
    screen: [1, 2],
    type: ['still', 'still'],
    vis: [1, 0],
    pos: [1225, 15]
  }, {
    name: 'grass_1.png',
    screen: [1, 2],
    type: ['still', 'still'],
    vis: [1, 0],
    pos: [980, 0]
  }, {
    name: 'grass_0.png',
    screen: [1, 2],
    type: ['still', 'still'],
    vis: [1, 0],
    pos: [805, 20]
  }, {
    name: 'grass_3.png',
    screen: [1, 2],
    type: ['still', 'still'],
    vis: [1, 0],
    pos: [1200, 330]
  }, {
    name: 'grass_4.png',
    screen: [1, 2],
    type: ['still', 'still'],
    vis: [1, 0],
    pos: [1200, 470]
  }, {
    name: 'casetteIcon.png',
    screen: [1, 2],
    type: 'button',
    vis: 1,
    pos: [1335, 560]
  }, {
    name: 'grass_5.png',
    screen: [1, 2],
    type: ['still', 'still'],
    vis: [1, 0],
    pos: [1280, 555]
  }, {
    name: 'grass_6.png',
    screen: [1, 2],
    type: ['still', 'still'],
    vis: [1, 0],
    pos: [1270, 670]
  }, {
    name: 'grass_7.png',
    screen: [1, 2],
    type: ['still', 'still'],
    vis: [1, 0],
    pos: [1100, 740]
  }, {
    name: 'trash.png',
    screen: [1, 2],
    type: 'still',
    vis: 0,
    pos: [1145, 690]
  }, {
    name: 'grass_8.png',
    screen: [1, 2],
    type: ['still', 'still'],
    vis: [1, 0],
    pos: [1090, 900]
  }, {
    name: 'harvest.png',
    screen: [1],
    type: ['still', 'button', 'button'],
    vis: [1, 0, 0],
    pos: [50, 850]
  }],
  /////
  vehicle: [{
    name: 'truck.png',
    screen: [1],
    type: ['still', 'still'],
    vis: [0, 0],
    pos: [1220, 1080],
    stop: 0.55,
    stopFrame: [36, 36],
    velocity: 15 * 2
  }, {
    name: 'bike.png',
    screen: [1],
    type: ['still', 'still'],
    vis: [0, 0],
    pos: [1270, 1080],
    stop: 0.92,
    stopFrame: [480, 480],
    velocity: 10 * 2
  }, {
    name: 'car.png',
    screen: [1],
    type: 'still',
    vis: 0,
    pos: [1250, 1080],
    stop: 0.95,
    stopFrame: [480, 480],
    velocity: 20 * 2
  }],
  icon: [{
    name: 'cursor.png',
    screen: [0, 1, 2],
    type: ['cursor', 'cursor'],
    vis: [1, 0],
    offset: [
      [0, 0],
      [-0.5, 0]
    ]
  }],
  dlg: [{
    name: 'dlgBox_agent.png',
    screen: [1],
    type: 'still',
    vis: 0,
    pos: [460, 380]
  }, {
    name: 'sellButton_0.png',
    screen: [1],
    type: 'button',
    vis: 0,
    pos: [825, 585]
  }, {
    name: 'sellButton_1.png',
    screen: [1],
    type: 'button',
    vis: 0,
    pos: [1015, 585]
  }, {
    name: 'dlgBox_lanyi.png',
    screen: [1],
    type: 'still',
    vis: 0,
    pos: [460, 380]
  }, {
    name: 'dlg_savePhoto.png',
    screen: [1, 2],
    type: 'still',
    vis: 0,
    pos: [500, 280]
  }, {
    name: 'saveButton.png',
    screen: [1, 2],
    type: 'button',
    vis: 0,
    pos: [745, 715]
  }, {
    name: 'casette.png',
    screen: [1, 2],
    type: 'still',
    vis: 0,
    pos: [550, 360]
  }, {
    name: 'dlgBox_sold.png',
    screen: [1],
    type: 'still',
    vis: 0,
    pos: [480, 270]
  }, {
    name: 'dlgBox_score.png',
    screen: [1],
    type: 'still',
    vis: 0,
    pos: [480, 270]
  }, {
    name: 'dlgBox_starEmpty.png',
    screen: [1],
    type: ['still'],
    vis: 0,
    pos: [580, 310]
  }, {
    name: 'dlgBox_starFilled.png',
    screen: [1],
    type: ['still'],
    vis: 0,
    pos: [580, 310]
  }],
  ////
  toolBar: [{
    name: 'toolBar_0.png',
    screen: [1],
    type: 'still',
    vis: 1,
    pos: [1920 - 315, 0]
  }, {
    name: 'toolBar_1.png',
    screen: [2],
    type: 'still',
    vis: 1,
    pos: [1920 - 315, 0]
  }, {
    name: 'tool_camera.png',
    screen: [1, 2],
    type: ['button', 'button'],
    vis: [1, 0],
    pos: [1920 - 320 + 45 + 15 + 115, 45]
  }, {
    name: 'tool_knife.png',
    screen: [1],
    type: ['button', 'button', 'cursor'],
    vis: [1, 0, 0],
    pos: [1920 - 320 + 45, 45],
    offset: [-0.1, -0.25]
  }, {
    name: 'tool_ash.png',
    screen: [1],
    type: ['button', 'button', 'cursor'],
    vis: [1, 0, 0],
    pos: [1920 - 320 + 45, 45 + 20 + 115],
    offset: [-0.3, 0]
  }, {
    name: 'tool_bread.png',
    screen: [1],
    type: ['button', 'button', 'cursor'],
    vis: [1, 0, 0],
    pos: [1920 - 320 + 45 + 15 + 115, 45 + 20 + 115],
    offset: [-0.3, -0.1]
  }, {
    name: 'tool_peanut.png',
    screen: [1],
    type: ['button', 'button', 'cursor'],
    vis: [1, 0, 0],
    pos: [1920 - 320 + 45, 45 + 20 * 2 + 115 * 2], 
    offset: [-0.3, -0.15]
  }, {
    name: 'tool_tea.png',
    screen: [1],
    type: ['button', 'button', 'cursor'],
    vis: [1, 0, 0],
    pos: [1920 - 320 + 45 + 15 + 115, 45 + 20 * 2 + 115 * 2], 
    offset: [-0.2, 0]
  }, {
    name: 'fish_micro.png',
    screen: [1],
    type: 'button',
    vis: 1,
    pos: [1920 - 320 + 40, 30 * 5 + 115 * 3]
  }, {
    name: 'fish_wu_1.png',
    screen: [1],
    type: 'button',
    vis: 1,
    pos: [1920 - 320 + 40, 30 * 5 + 115 * 3 + 20 + 165]
  }, {
    name: 'fish_wu_0.png',
    screen: [1],
    type: 'button',
    vis: 0,
    pos: [1920 - 320 + 40 + 50, 30 * 5 + 115 * 3 + 20 + 165 + 18]
  }, {
    name: 'fish_wan_1.png',
    screen: [1],
    type: 'button',
    vis: 1,
    pos: [1920 - 320 + 40 + 20, 30 * 5 + 115 * 3 + 20 * 2 + 165 + 110]
  }, {
    name: 'fish_wan_0.png',
    screen: [1],
    type: 'button',
    vis: 0,
    pos: [1920 - 320 + 40 + 20 + 40, 30 * 5 + 115 * 3 + 20 * 2 + 165 + 110 + 12]
  }, {
    name: 'infoBox_camera.png',
    screen: [1],
    type: 'still',
    vis: 0,
    pos: [1920 - 320 - 345, 45 - 115 / 2 + 10]
  }, {
    name: 'infoBox_knife.png',
    screen: [1],
    type: 'still',
    vis: 0,
    pos: [1920 - 320 - 345, 45 - 115 / 2 + 10]
  }, {
    name: 'infoBox_ash.png',
    screen: [1],
    type: 'still',
    vis: 0,
    pos: [1920 - 320 - 345, 45 + 20 + 115 - 115 / 2]
  }, {
    name: 'infoBox_bread.png',
    screen: [1],
    type: 'still',
    vis: 0,
    pos: [1920 - 320 - 345, 45 + 20 + 115 - 115 / 2]
  }, {
    name: 'infoBox_peanut.png',
    screen: [1],
    type: 'still',
    vis: 0,
    pos: [1920 - 320 - 345, 45 + 20 * 2 + 115 * 2 - 115 / 2]
  }, {
    name: 'infoBox_tea.png',
    screen: [1],
    type: 'still',
    vis: 0,
    pos: [1920 - 320 - 345, 45 + 20 * 2 + 115 * 2 - 115 / 2]
  }, {
    name: 'infoBox_micro.png',
    screen: [1],
    type: 'still',
    vis: 0, 
    pos: [1920 - 320 - 345, 480]
  }, {
    name: 'infoBox_wu.png',
    screen: [1],
    type: 'still',
    vis: 0, 
    pos: [1920 - 320 - 345, 615]
  }, {
    name: 'infoBox_wan.png',
    screen: [1],
    type: 'still',
    vis: 0, 
    pos: [1920 - 320 - 345, 740]
  }, {
    name: 'state_oxy.png',
    screen: [1],
    type: ['still', 'still', 'still'],
    vis: [0, 0, 0],
    pos: [1670, 936]
  }, {
    name: 'state_toxin.png',
    screen: [1],
    type: ['still', 'still'],
    vis: [0, 0],
    pos: [1670, 973]
  }, {
    name: 'state_ph.png',
    screen: [1],
    type: ['still', 'still'],
    vis: [0, 0],
    pos: [1670, 1010]
  }]
}