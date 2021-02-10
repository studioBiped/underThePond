var cnv = [1920, 1080];
var sc = 0.67;
var screen = 1;
var cursorState = 'arrow';
var waterDarken = 0;
var takePhoto = 0;
var savePhoto = 0;
var dlgOn = 0;
var edge = [1100 * sc, 180 * sc];
var slant = 270;
var score = {
  oxy: 0,
  toxin: 1,
  ph: 0,
  wu: {
    growth: 0,
    healthy: 0.4,
    alive: 1
  },
  wan: {
    growth: 0,
    healthy: 0.45,
    alive: 1
  }
}

var gameOver = 0;

var event = {
  totFrame: 4320,
  agent: 0.1,
  lanyi: 0.5,
  truck: 0.8
}

var birdPreview = 0;

var birdImgData = [{
  idx: 1,
  name: 'Little Egret',
  scale: 5 * sc,
  userNum: 29,
  img: [],
  spriteIdx: [],
  state: [],
  durCounter: [],
  pos: [],
  flip: []
}];

var photoArr = []

function preload() {

  for (var a = 0; a < assets.envir.length; a++) {
    assets.envir[a].img = loadImage('images/envir/' + assets.envir[a].name);
  }

  for (var b = 0; b < assets.icon.length; b++) {
    assets.icon[b].img = loadImage('images/icon/' + assets.icon[b].name);
  }

  for (var d = 0; d < assets.vehicle.length; d++) {
    assets.vehicle[d].img = loadImage('images/vehicle/' + assets.vehicle[d].name);
  }

  for (var e = 0; e < assets.toolBar.length; e++) {
    assets.toolBar[e].img = loadImage('images/toolBar/' + assets.toolBar[e].name);
  }

  for (var c = 0; c < assets.dlg.length; c++) {
    assets.dlg[c].img = loadImage('images/dlg/' + assets.dlg[c].name);
  }

  for (var i = 0; i < birdImgData.length; i++) { //Type

    var idx0 = birdImgData[i].idx - 1;
    var birdString = '00' + birdImgData[i].idx;
    birdString = birdString.slice(birdString.length - 2, birdString.length);

    for (var j = 0; j < birdImgData[i].userNum; j++) { //User

      var userString = '00' + (j + 1);

      userString = userString.slice(userString.length - 2, userString.length);

      var loadedPagesArr = [];

      for (var k = 0; k < birdPreset[idx0].pageNum; k++) { //Page

        var fileString = 'images/' + birdString + '_' + userString + '_' + k + '.png';
        var loadedImg = loadImage(fileString);

        loadedPagesArr.push(loadedImg);

      }

      birdImgData[i].img.push(loadedPagesArr);

      var spriteArrRdm = parseInt(random() * birdPreset[idx0].spriteArr.length);
      var ySpaceOut =
        j * (1080 * sc - edge[1]) / birdImgData[i].userNum / 8;

      birdImgData[i].spriteIdx.push(spriteArrRdm);
      birdImgData[i].pos.push([
        parseInt(random(0, edge[0] - slant * sc)),
        edge[1] * 2.2 + ySpaceOut * j + parseInt(random(0, ySpaceOut))
      ]);
      birdImgData[i].flip.push(parseInt(random(2)) * 2 - 1);

      if (birdPreset[idx0].spriteArr[spriteArrRdm].seq) {
        birdImgData[i].durCounter.push(
          birdPreset[idx0].spriteArr[spriteArrRdm].dur);
        birdImgData[i].state.push(
          birdPreset[idx0].spriteArr[spriteArrRdm].states[0]);
      } else {

        birdImgData[i].durCounter.push(parseInt(random(1, 5) * 3));
        birdImgData[i].state.push(
          birdPreset[idx0].spriteArr[spriteArrRdm].state);
      }
    }
  }

}

function setup() {
  var canvas = createCanvas(cnv[0] * sc, cnv[1] * sc);
  frameRate(12);
  noCursor();
}

function draw() {
  background(220);

  if (gameOver == 0) {

    if (frameCount > event.totFrame * event.agent) {
      assets.vehicle[2].vis = 1;
      event.agent = 0;
    }

    if (frameCount > event.totFrame * event.lanyi) {
      assets.vehicle[1].vis[0] = 1;
      event.lanyi = 0;
    }

    if (frameCount > event.totFrame * event.truck) {
      assets.vehicle[0].vis[0] = 1;
      event.truck = 0;
    }

    score.wu.growth = min(frameCount / event.totFrame, 1);
    score.wan.growth = min(frameCount * 1.1 / event.totFrame, 1);

  }

  if (score.wu.growth < 0.5) {
    assets.toolBar[9].vis = 0;
    assets.toolBar[10].vis = 1;
  } else {
    assets.toolBar[9].vis = 1;
    assets.toolBar[10].vis = 0;
  }

  if (score.wan.growth < 0.5) {
    assets.toolBar[11].vis = 0;
    assets.toolBar[12].vis = 1;
  } else {
    assets.toolBar[11].vis = 1;
    assets.toolBar[12].vis = 0;
  }

  assets.toolBar[22].vis = [0, 0, 0];
  if (score.oxy < 0.33) {
    assets.toolBar[22].vis[2] = 1;
  } else if (score.oxy < 0.66) {
    assets.toolBar[22].vis[1] = 1;
  } else {
    assets.toolBar[22].vis[0] = 1;
  }

  assets.toolBar[23].vis = [0, 0];
  if (score.toxin < 0.5) {
    assets.toolBar[23].vis[0] = 1;
  } else {
    assets.toolBar[23].vis[1] = 1;
  }

  assets.toolBar[24].vis = [0, 0];
  if (score.ph < 0.5) {
    assets.toolBar[24].vis[1] = 1;
  } else {
    assets.toolBar[24].vis[0] = 1;
  }

  if (frameCount < event.totFrame) {
    score.wu.healthy = score.wu.healthy - (0.2 - score.oxy) * 0.4 * random() / event.totFrame;
    score.wu.healthy = score.wu.healthy - (0.2 - score.ph) * 0.4 * random() / event.totFrame;
    score.wu.healthy = score.wu.healthy - (score.toxin - 0.8) * 0.4 * random() / event.totFrame;
    score.wu.healthy = min(score.wu.healthy, 1);

    score.wan.healthy = score.wan.healthy - (0.2 - score.oxy) * 0.4 * random() / event.totFrame;
    score.wan.healthy = score.wan.healthy - (0.2 - score.ph) * 0.4 * random() / event.totFrame;
    score.wan.healthy = score.wan.healthy - (score.toxin - 0.8) * 0.4 * random() / event.totFrame;
    score.wan.healthy = min(score.wan.healthy, 1);

    score.wu.alive = score.wu.alive - (1 - score.wu.healthy) * random() / event.totFrame;
    score.wan.alive = score.wan.alive - (1 - score.wan.healthy) * random() / event.totFrame;

  } else {
    if (assets.envir[19].vis[0] == 1) {
      assets.envir[19].vis[0] = 0;
      assets.envir[19].vis[1] = 1;
    } 
  }

  waterDarken = 1 - (score.wu.healthy + score.wan.healthy) / 2;

  for (var d = 0; d < assets.envir.length; d++) {

    if ((assets.envir[d].screen).includes(screen)) { //

      if (assets.envir[d].name == 'oxyMachine.png' && frameCount % 2) {

        for (var e = 0; e < assets.envir[d].mult; e++) {

          if (assets.envir[d].turnedOn[e]) {

            var curOxyFrame = (assets.envir[d].vis[e]).indexOf(1);

            if (curOxyFrame == 4) {
              assets.envir[d].vis[e][1] = 1;
            } else {
              assets.envir[d].vis[e][curOxyFrame + 1] = 1;
            }
            assets.envir[d].vis[e][curOxyFrame] = 0;

          }

        }

      }

    } //

  }

  for (var v = 0; v < assets.vehicle.length; v++) {

    if ((assets.vehicle[v].screen).includes(screen)) { //

      if (typeof assets.vehicle[v].type == 'object') {

        if (assets.vehicle[v].vis[0] == 1 &&
          assets.vehicle[v].stopFrame[1] == assets.vehicle[v].stopFrame[0]) {
          assets.vehicle[v].pos = [
            assets.vehicle[v].pos[0] + assets.vehicle[v].velocity / cnv[1] * slant,
            assets.vehicle[v].pos[1] - assets.vehicle[v].velocity
          ];
        }

        if (assets.vehicle[v].pos[1] < cnv[1] * (1 - assets.vehicle[v].stop) &&
          assets.vehicle[v].stopFrame[1]) {
          assets.vehicle[v].stopFrame[1] = assets.vehicle[v].stopFrame[1] - 1;
          if (assets.vehicle[v].name == 'bike.png') {
            assets.vehicle[v].vis[0] = 0;
            assets.vehicle[v].vis[1] = 1;
            assets.envir[6].vis = 1;
          }
        }

        if (assets.vehicle[v].vis[0] && assets.vehicle[v].stopFrame[1] == 0) {
          if (assets.vehicle[v].name == 'truck.png') {
            assets.vehicle[v].vis[0] = 0;
            assets.vehicle[v].vis[1] = 1;
            assets.envir[16].vis = 0;
            assets.envir[17].vis = 1;
          }
        } else if (assets.vehicle[v].vis[1] && assets.vehicle[v].stopFrame[1] == 0) {
          if (assets.vehicle[v].name == 'bike.png') {
            assets.vehicle[v].vis[0] = 1;
            assets.vehicle[v].vis[1] = 0;
            assets.envir[6].vis = 0;
          }
        }

        if (assets.vehicle[v].vis[1] == 1 && assets.vehicle[v].stopFrame[1] == 0) {
          if (assets.vehicle[v].name == 'truck.png') {
            assets.vehicle[v].pos = [
              assets.vehicle[v].pos[0] + assets.vehicle[v].velocity * 2 / cnv[1] * slant,
              assets.vehicle[v].pos[1] - assets.vehicle[v].velocity * 2
            ];
          }
        } else if (assets.vehicle[v].vis[1] == 0 && assets.vehicle[v].stopFrame[1] == 0) {
          if (assets.vehicle[v].name == 'bike.png') {
            assets.vehicle[v].pos = [
              assets.vehicle[v].pos[0] + assets.vehicle[v].velocity / cnv[1] * slant,
              assets.vehicle[v].pos[1] - assets.vehicle[v].velocity
            ];

          }

        }

        if (assets.vehicle[v].pos[1] < -assets.vehicle[v].img.height) {
          assets.vehicle[v].vis = [0, 0];
        }


      } else if (assets.vehicle[v].vis) {

        if (assets.vehicle[v].stopFrame[1] == assets.vehicle[v].stopFrame[0] ||
          assets.vehicle[v].stopFrame[1] == 0) {
          assets.vehicle[v].pos = [
            assets.vehicle[v].pos[0] + assets.vehicle[v].velocity / cnv[1] * slant,
            assets.vehicle[v].pos[1] - assets.vehicle[v].velocity
          ];

          if (assets.vehicle[v].stopFrame[1] == 0) {
            assets.envir[5].vis = 0;
          }
        }

        if (assets.vehicle[v].pos[1] < cnv[1] * (1 - assets.vehicle[v].stop) &&
          assets.vehicle[v].stopFrame[1]) {
          assets.vehicle[v].stopFrame[1] = assets.vehicle[v].stopFrame[1] - 1;
          if (assets.vehicle[v].stopFrame[1] == assets.vehicle[v].stopFrame[0] - 6) {
            assets.envir[5].vis = 1;
          }

        }

        if (assets.vehicle[v].pos[1] < -assets.vehicle[v].img.height) {
          assets.vehicle[v].vis = 0;
        }

      }

    } //

  }



  //// load img

  var highlightOn = 0;

  for (var a = 0; a < assets.envir.length; a++) {
    if ((assets.envir[a].screen).includes(screen)) { //

      if (assets.envir[a].vis && (assets.envir[a].type == 'still' || assets.envir[a].type == 'button')) {

        image(assets.envir[a].img,
          assets.envir[a].pos[0] * sc,
          assets.envir[a].pos[1] * sc,
          assets.envir[a].img.width * sc,
          assets.envir[a].img.height * sc);

        photoArr.push([assets.envir[a].img,
          assets.envir[a].pos[0] * sc,
          assets.envir[a].pos[1] * sc,
          assets.envir[a].img.width * sc,
          assets.envir[a].img.height * sc
        ]);

      } else if (assets.envir[a].type == 'waterFx') {

        blendMode(MULTIPLY);
        for (var f = 0; f < waterDarken * 10; f++) {

          image(assets.envir[a].img,
            assets.envir[a].pos[0] * sc,
            assets.envir[a].pos[1] * sc,
            assets.envir[a].img.width * sc,
            assets.envir[a].img.height * sc);

          photoArr.push(['multiply',
            assets.envir[a].img,
            assets.envir[a].pos[0] * sc,
            assets.envir[a].pos[1] * sc,
            assets.envir[a].img.width * sc,
            assets.envir[a].img.height * sc
          ]);

        }
        blendMode(BLEND);

        if (cursorState.includes('hover') &&
          cursorState.includes('knife') !== true &&
          mouseX > 0 &&
          mouseY < cnv[1] * sc &&
          mouseX < edge[0] + (1 - (mouseY / sc) / cnv[1]) * slant * sc &&
          mouseY > edge[1]) {

          blendMode(ADD);

          image(assets.envir[a].img,
            assets.envir[a].pos[0] * sc,
            assets.envir[a].pos[1] * sc,
            assets.envir[a].img.width * sc,
            assets.envir[a].img.height * sc);

          blendMode(BLEND);

        }

      } else if (typeof assets.envir[a].type == 'object') {

        for (var b = 0; b < assets.envir[a].type.length; b++) {

          if (assets.envir[a].vis[b] && (assets.envir[a].type[b] == 'still' || assets.envir[a].type[b] == 'button')) {

            image(assets.envir[a].img,
              assets.envir[a].pos[0] * sc,
              assets.envir[a].pos[1] * sc,
              assets.envir[a].img.width / assets.envir[a].type.length * sc,
              assets.envir[a].img.height * sc,
              assets.envir[a].img.width / assets.envir[a].type.length * b,
              0,
              assets.envir[a].img.width / assets.envir[a].type.length,
              assets.envir[a].img.height);

            photoArr.push([assets.envir[a].img,
              assets.envir[a].pos[0] * sc,
              assets.envir[a].pos[1] * sc,
              assets.envir[a].img.width / assets.envir[a].type.length * sc,
              assets.envir[a].img.height * sc,
              assets.envir[a].img.width / assets.envir[a].type.length * b,
              0,
              assets.envir[a].img.width / assets.envir[a].type.length,
              assets.envir[a].img.height
            ]);

            if (highlightOn == 0 &&
              (cursorState).includes('knife') &&
              mouseX > assets.envir[a].pos[0] * sc &&
              mouseY > assets.envir[a].pos[1] * sc &&
              mouseX < (assets.envir[a].pos[0] + assets.envir[a].img.width / assets.envir[a].type.length) * sc &&
              mouseY < (assets.envir[a].pos[1] + assets.envir[a].img.height * 0.75) * sc &&
              assets.envir[a].vis[0]) {

              blendMode(HARD_LIGHT);
              image(assets.envir[a].img,
                assets.envir[a].pos[0] * sc,
                assets.envir[a].pos[1] * sc,
                assets.envir[a].img.width / assets.envir[a].type.length * sc,
                assets.envir[a].img.height * sc,
                assets.envir[a].img.width / assets.envir[a].type.length * b,
                0,
                assets.envir[a].img.width / assets.envir[a].type.length,
                assets.envir[a].img.height);

              blendMode(BLEND);
              highlightOn = 1;

            }

          } else if (assets.envir[a].type[b] == 'buttonMult') {

            for (var m = 0; m < assets.envir[a].mult; m++) {

              if (assets.envir[a].vis[m][b]) {

                image(assets.envir[a].img,
                  assets.envir[a].pos[m][0] * sc,
                  assets.envir[a].pos[m][1] * sc,
                  assets.envir[a].img.width / assets.envir[a].type.length * sc,
                  assets.envir[a].img.height * sc,
                  assets.envir[a].img.width / assets.envir[a].type.length * b,
                  0,
                  assets.envir[a].img.width / assets.envir[a].type.length,
                  assets.envir[a].img.height);

                photoArr.push([assets.envir[a].img,
                  assets.envir[a].pos[m][0] * sc,
                  assets.envir[a].pos[m][1] * sc,
                  assets.envir[a].img.width / assets.envir[a].type.length * sc,
                  assets.envir[a].img.height * sc,
                  assets.envir[a].img.width / assets.envir[a].type.length * b,
                  0,
                  assets.envir[a].img.width / assets.envir[a].type.length,
                  assets.envir[a].img.height
                ]);

              }

            }

          }

        }

      }

    } //

  }

  for (var z = 0; z < assets.vehicle.length; z++) {

    if ((assets.vehicle[z].screen).includes(screen)) { //

      if (typeof assets.vehicle[z].type == 'object') {

        for (var t = 0; t < assets.vehicle[z].type.length; t++) {

          if (assets.vehicle[z].vis[t]) {

            //print(assets.vehicle[z].pos[0] * sc + ' ' + assets.vehicle[z].pos[1] * sc)
            image(assets.vehicle[z].img,
              assets.vehicle[z].pos[0] * sc,
              assets.vehicle[z].pos[1] * sc,
              assets.vehicle[z].img.width / assets.vehicle[z].type.length * sc,
              assets.vehicle[z].img.height * sc,
              assets.vehicle[z].img.width / assets.vehicle[z].type.length * t,
              0,
              assets.vehicle[z].img.width / assets.vehicle[z].type.length,
              assets.vehicle[z].img.height);

            photoArr.push([assets.vehicle[z].img,
              assets.vehicle[z].pos[0] * sc,
              assets.vehicle[z].pos[1] * sc,
              assets.vehicle[z].img.width / assets.vehicle[z].type.length * sc,
              assets.vehicle[z].img.height * sc,
              assets.vehicle[z].img.width / assets.vehicle[z].type.length * t,
              0,
              assets.vehicle[z].img.width / assets.vehicle[z].type.length,
              assets.vehicle[z].img.height
            ]);
          }

        }

      } else if (assets.vehicle[z].vis) {

        image(assets.vehicle[z].img,
          assets.vehicle[z].pos[0] * sc,
          assets.vehicle[z].pos[1] * sc,
          assets.vehicle[z].img.width * sc,
          assets.vehicle[z].img.height * sc
        );

        photoArr.push([assets.vehicle[z].img,
          assets.vehicle[z].pos[0] * sc,
          assets.vehicle[z].pos[1] * sc,
          assets.vehicle[z].img.width * sc,
          assets.vehicle[z].img.height * sc
        ]);

      }

    } //

  }

  for (var o = 0; o < assets.toolBar.length; o++) {

    if ((assets.toolBar[o].screen).includes(screen)) { //

      if (typeof assets.toolBar[o].type == 'object') {

        for (var s = 0; s < assets.toolBar[o].type.length; s++) {

          if (assets.toolBar[o].vis[s]) {
            image(assets.toolBar[o].img,
              assets.toolBar[o].pos[0] * sc,
              assets.toolBar[o].pos[1] * sc,
              assets.toolBar[o].img.width / assets.toolBar[o].type.length * sc,
              assets.toolBar[o].img.height * sc,
              assets.toolBar[o].img.width / assets.toolBar[o].type.length * s,
              0,
              assets.toolBar[o].img.width / assets.toolBar[o].type.length,
              assets.toolBar[o].img.height);

            photoArr.push([assets.toolBar[o].img,
              assets.toolBar[o].pos[0] * sc,
              assets.toolBar[o].pos[1] * sc,
              assets.toolBar[o].img.width / assets.toolBar[o].type.length * sc,
              assets.toolBar[o].img.height * sc,
              assets.toolBar[o].img.width / assets.toolBar[o].type.length * s,
              0,
              assets.toolBar[o].img.width / assets.toolBar[o].type.length,
              assets.toolBar[o].img.height
            ]);
          }

        }

      } else if (assets.toolBar[o].type == 'still' && assets.toolBar[o].vis) {

        image(assets.toolBar[o].img, assets.toolBar[o].pos[0] * sc, assets.toolBar[o].pos[1] * sc, assets.toolBar[o].img.width * sc, assets.toolBar[o].img.height * sc);

        photoArr.push([assets.toolBar[o].img, assets.toolBar[o].pos[0] * sc, assets.toolBar[o].pos[1] * sc, assets.toolBar[o].img.width * sc, assets.toolBar[o].img.height * sc]);

      } else if (assets.toolBar[o].type == 'button' && assets.toolBar[o].vis) {

        image(assets.toolBar[o].img, assets.toolBar[o].pos[0] * sc, assets.toolBar[o].pos[1] * sc, assets.toolBar[o].img.width * sc, assets.toolBar[o].img.height * sc);

        photoArr.push([assets.toolBar[o].img, assets.toolBar[o].pos[0] * sc, assets.toolBar[o].pos[1] * sc, assets.toolBar[o].img.width * sc, assets.toolBar[o].img.height * sc]);

      }

    } //

  }

  for (var w = 0; w < assets.dlg.length; w++) {
    if ((assets.dlg[w].screen).includes(screen) && assets.dlg[w].vis) { //

      image(assets.dlg[w].img, assets.dlg[w].pos[0] * sc, assets.dlg[w].pos[1] * sc, assets.dlg[w].img.width * sc, assets.dlg[w].img.height * sc);

      photoArr.push([assets.dlg[w].img, assets.dlg[w].pos[0] * sc, assets.dlg[w].pos[1] * sc, assets.dlg[w].img.width * sc, assets.dlg[w].img.height * sc]);

    } //

  }
  
  if (assets.dlg[8].vis){
    
    var avgScore = (score.wan.alive + score.wu.alive) / 2;
    
    for (var o = 0; o < avgScore * 2; o++){
      image(assets.dlg[10].img, (assets.dlg[9].pos[0] + o * 160) * sc, assets.dlg[9].pos[1] * sc, assets.dlg[9].img.width * sc, assets.dlg[9].img.height * sc);
    }
    
    for (var o = 0; o < (1 - avgScore) * 2; o++){
      image(assets.dlg[9].img, (assets.dlg[9].pos[0] + (2 - o) * 160) * sc, assets.dlg[9].pos[1] * sc, assets.dlg[9].img.width * sc, assets.dlg[9].img.height * sc);
    }
    
    
    
    //assets.dlg[9].vis = 1;
    //assets.dlg[10].vis = 1;
    
      push();
      noStroke();
      fill(255);
      textSize(60 * sc);
      textAlign(LEFT, TOP);
      text(parseInt(score.wan.alive * 100),
        (assets.dlg[8].pos[0] + assets.dlg[8].img.width/2) * sc,
        (assets.dlg[8].pos[1] + 288) * sc);
      text(parseInt(score.wu.alive * 100),
        (assets.dlg[8].pos[0] + assets.dlg[8].img.width/2) * sc,
        (assets.dlg[8].pos[1] + 364) * sc);
      pop();
  }

  //// change cursor

  for (var c = 0; c < assets.toolBar.length; c++) {
    if ((assets.toolBar[c].name).includes('infoBox')) {
      assets.toolBar[c].vis = 0;
    }
  }

  dlgOn = 0;
  for (var dlgVis = 0; dlgVis < assets.dlg.length; dlgVis++) {
    if (assets.dlg[dlgVis].vis == 1) {
      dlgOn = 1;
    }
  }

  if (dlgOn == 0) {
    for (var r = 0; r < assets.envir.length; r++) {

      var breakCueAll = 0;

      if ((assets.envir[r].screen).includes(screen)) { //

        if (assets.envir[r].vis && assets.envir[r].type == 'button') {

          if (mouseX > assets.envir[r].pos[0] * sc &&
            mouseY > assets.envir[r].pos[1] * sc &&
            mouseX < (assets.envir[r].pos[0] + assets.envir[r].img.width) * sc &&
            mouseY < (assets.envir[r].pos[1] + assets.envir[r].img.height) * sc) {

            if (cursorState == 'arrow' && dlgOn == 0) {
              cursorState = 'pointer';
            }

            breakCueAll = 1;
            break;

          } else {

            if (cursorState == 'pointer') {
              cursorState = 'arrow';
            }

          }

        } else if (typeof assets.envir[r].type == 'object') {

          for (var q = 0; q < assets.envir[r].type.length; q++) {

            if (assets.envir[r].vis[q] && assets.envir[r].type[q] == 'button') {

              if (mouseX > assets.envir[r].pos[0] * sc &&
                mouseY > assets.envir[r].pos[1] * sc &&
                mouseX < (assets.envir[r].pos[0] +
                  assets.envir[r].img.width / assets.envir[r].type.length) * sc &&
                mouseY < (assets.envir[r].pos[1] +
                  assets.envir[r].img.width / assets.envir[r].type.length) * sc) {

                if (cursorState == 'arrow' && dlgOn == 0) {
                  cursorState = 'pointer';
                }

                breakCueAll = 1;
                break;

              } else {

                if (cursorState == 'pointer') {
                  cursorState = 'arrow';
                }

              }

            } else if (assets.envir[r].type[q] == 'buttonMult') {

              var breakCue = 0;

              for (var p = 0; p < assets.envir[r].mult; p++) {

                if (assets.envir[r].vis[p][q]) {

                  if (mouseX > assets.envir[r].pos[p][0] * sc &&
                    mouseY > assets.envir[r].pos[p][1] * sc &&
                    mouseX < (assets.envir[r].pos[p][0] +
                      assets.envir[r].img.width / assets.envir[r].type.length) * sc &&
                    mouseY < (assets.envir[r].pos[p][1] +
                      assets.envir[r].img.width / assets.envir[r].type.length) * sc) {

                    if (cursorState == 'arrow' && dlgOn == 0) {
                      cursorState = 'pointer';
                    }

                    breakCue = 1;
                    breakCueAll = 1;
                    break;

                  } else {

                    if (cursorState == 'pointer') {
                      cursorState = 'arrow';
                    }

                  }

                }

              }

              if (breakCue) {
                break;
              }

            }

          }

        }

      } //

      if (breakCueAll) {
        break;
      }

    }

    for (var h = 0; h < assets.toolBar.length; h++) {

      if ((assets.toolBar[h].screen).includes(screen)) { // 

        if (typeof assets.toolBar[h].type == 'object') {

          for (var g = 0; g < assets.toolBar[h].type.length; g++) {

            if (assets.toolBar[h].type[g] == 'button' && assets.toolBar[h].vis[g]) {

              if (mouseX > assets.toolBar[h].pos[0] * sc &&
                mouseY > assets.toolBar[h].pos[1] * sc &&
                mouseX < (assets.toolBar[h].pos[0] + assets.toolBar[h].img.width / assets.toolBar[h].type.length) * sc &&
                mouseY < (assets.toolBar[h].pos[1] + assets.toolBar[h].img.height) * sc) {

                if (cursorState == 'arrow') {
                  cursorState = 'pointer';
                  assets.toolBar[h + 11].vis = 1;
                }

                if (assets.toolBar[h].name == 'tool_camera.png') {
                  assets.toolBar[h].vis[0] = 0;
                  assets.toolBar[h].vis[1] = 1;
                }

                break;

              } else {
                assets.toolBar[h].vis[0] = 1;
                assets.toolBar[h].vis[1] = 0;
              }

              if (h == 3) {

                var grassHover = 0;

                for (var k = 0; k < assets.envir.length; k++) {

                  if ((assets.envir[k].name).includes('grass')) {

                    if (mouseX > assets.envir[k].pos[0] * sc &&
                      mouseY > assets.envir[k].pos[1] * sc &&
                      mouseX < (assets.envir[k].pos[0] + assets.envir[k].img.width / assets.envir[k].type.length) * sc &&
                      mouseY < (assets.envir[k].pos[1] + assets.envir[k].img.height * 0.75) * sc &&
                      assets.envir[k].vis[0]) {

                      if (cursorState == 'tool_knife.png') {
                        cursorState = 'tool_knife.png_hover';
                      }

                      grassHover = 1;
                      break;

                    }

                  }

                }

                if (cursorState == 'tool_knife.png_hover' && grassHover == 0) {
                  cursorState = 'tool_knife.png';
                }

              } else {
                if (mouseX < edge[0] + (1 - (mouseY / sc) / cnv[1]) * slant * sc && mouseY > edge[1]) {

                  if (cursorState == assets.toolBar[h].name) {
                    cursorState = assets.toolBar[h].name + '_hover';
                  }

                } else {

                  if (cursorState == assets.toolBar[h].name + '_hover') {
                    cursorState = assets.toolBar[h].name;
                  }

                }

              }

            }

          }

        } else if (assets.toolBar[h].type == 'button' && assets.toolBar[h].vis) {

          if (mouseX > assets.toolBar[h].pos[0] * sc &&
            mouseY > assets.toolBar[h].pos[1] * sc &&
            mouseX < (assets.toolBar[h].pos[0] + assets.toolBar[h].img.width) * sc &&
            mouseY < (assets.toolBar[h].pos[1] + assets.toolBar[h].img.height) * sc) {

            if (cursorState == 'arrow') {
              cursorState = 'pointer';


              if (h <= 9) {
                assets.toolBar[h + 11].vis = 1;
              } else if (h >= 10 && h <= 11) {
                assets.toolBar[h + 10].vis = 1;
              } else {
                assets.toolBar[h + 9].vis = 1;
              }

              push();
              fill(255);
              textSize(30 * sc);
              if (assets.toolBar[21].vis == 1) {
                text(parseInt(score.wan.growth * 100) + ' %',
                  (1920 - 320 - 345 + 130) * sc, (740 + 127) * sc);
                text(parseInt(score.wan.healthy * 100) + ' %',
                  (1920 - 320 - 345 + 130) * sc, (740 + 127 + 41) * sc);
                text(parseInt(score.wan.alive * 100) + ' %',
                  (1920 - 320 - 345 + 130 + 32) * sc, (740 + 127 + 41 * 2) * sc);
              } else if (assets.toolBar[20].vis == 1) {
                text(parseInt(score.wu.growth * 100) + ' %',
                  (1920 - 320 - 345 + 130) * sc, (615 + 127) * sc);
                text(parseInt(score.wu.healthy * 100) + ' %',
                  (1920 - 320 - 345 + 130) * sc, (615 + 127 + 41) * sc);
                text(parseInt(score.wu.alive * 100) + ' %',
                  (1920 - 320 - 345 + 130 + 32) * sc, (615 + 127 + 41 * 2) * sc);
              }
              pop();

            }

            break;

          }

        }

      } //

    }

  }

  for (var u = 0; u < assets.dlg.length; u++) {

    if ((assets.dlg[u].screen).includes(screen) && assets.dlg[u].vis) { //

      if (assets.dlg[u].type == 'still') {

        if (mouseX > assets.dlg[u].pos[0] * sc &&
          mouseY > assets.dlg[u].pos[1] * sc &&
          mouseX < (assets.dlg[u].pos[0] + assets.dlg[u].img.width) * sc &&
          mouseY < (assets.dlg[u].pos[1] + assets.dlg[u].img.height) * sc) {

          if (cursorState == 'pointer') {
            cursorState = 'arrow';
          }

        }

      } else if (assets.dlg[u].type == 'button') {

        if (mouseX > assets.dlg[u].pos[0] * sc &&
          mouseY > assets.dlg[u].pos[1] * sc &&
          mouseX < (assets.dlg[u].pos[0] + assets.dlg[u].img.width) * sc &&
          mouseY < (assets.dlg[u].pos[1] + assets.dlg[u].img.height) * sc) {

          if (cursorState == 'arrow') {
            cursorState = 'pointer';
          }

          break;

        } else {

          if (cursorState == 'pointer') {
            cursorState = 'arrow';
          }

        }

      } 

    } //

  }

  //// BIRD
  if (screen == 2) {

    for (var i = 0; i < birdImgData.length; i++) { //Type
      for (var j = 0; j < birdImgData[i].userNum; j++) { //User

        var idx0 = birdImgData[i].idx - 1;
        var spriteIdx = birdImgData[i].spriteIdx[j];
        var idleDur = parseInt(random(1, 5)) * 3;

        birdImgData[i].durCounter[j] = birdImgData[i].durCounter[j] - 1;

        var dur;
        var frame;

        if (birdPreset[idx0].spriteArr[spriteIdx].seq) {
          dur = birdPreset[idx0].spriteArr[spriteIdx].dur;
          frame = birdPreset[idx0].spriteArr[spriteIdx].start +
            (dur - birdImgData[i].durCounter[j] - 1); //frameCount - 1;

        } else {
          dur = idleDur;
          frame = birdPreset[idx0].spriteArr[spriteIdx].start;
        }

        var cellNum = birdPreset[idx0].cellNum;
        var cellSize = birdPreset[idx0].dimension / birdPreset[idx0].cellNum;
        var page = parseInt((frame) / pow(cellNum, 2)) % birdPreset[idx0].pageNum;

        var pageFrame = frame % pow(cellNum, 2);
        var frameX = (pageFrame % cellNum) * cellSize;
        var frameY = (parseInt(pageFrame / cellNum)) * cellSize;
        var size =
          birdPreset[idx0].size * birdImgData[i].scale;

        var pos = birdImgData[i].pos[j];

        if (birdPreset[idx0].spriteArr[spriteIdx].flip) {
          if (dur - birdImgData[i].durCounter[j] - 1 == parseInt(dur / 2)) {
            birdImgData[i].flip[j] = birdImgData[i].flip[j] * -1;
          }
        }

        push();
        translate(pos[0], pos[1]);
        translate(-size * birdPreset[idx0].anchor * birdImgData[i].flip[j], -size / 2);
        scale(birdImgData[i].flip[j], 1) //birdImgData[i].flip[j], 1);

        image(birdImgData[i].img[j][page], 0, 0, size, size, frameX, frameY, 480, 480);

        pop();

        if (birdPreset[idx0].spriteArr[spriteIdx].velocity) {

          var localFrame = dur - birdImgData[i].durCounter[j] - 1;
          var vel = birdPreset[idx0].spriteArr[spriteIdx].velocity;

          if (localFrame >= vel[1] && localFrame <= vel[2]) {

            pos[0] = pos[0] - parseInt(vel[0] / 4 / (vel[2] - vel[1]) * size / 480) * birdImgData[i].flip[j];

          }

          birdImgData[i].pos[j] = pos;

        }

        if (birdImgData[i].durCounter[j] == 0) {

          if (birdPreset[idx0].spriteArr[spriteIdx].seq) {
            birdImgData[i].state[j] = birdPreset[idx0].spriteArr[spriteIdx].states[1];
          }

          if (((pos[0] < 20 && birdImgData[i].flip[j] > 0) ||
              (pos[0] > edge[0] && birdImgData[i].flip[j] < 0)) &&
            birdImgData[i].state[j] == 1 &&
            birdImgData[i].spriteIdx[j] !== 3) {

            birdImgData[i].spriteIdx[j] = 3;

            birdImgData[i].durCounter[j] =
              birdPreset[idx0].spriteArr[3].dur;

          } else {

            var chancePoolArr = [];
            var totChance = 0;

            for (var s = 0; s < birdPreset[idx0].spriteArr.length; s++) {

              var state;
              if (birdPreset[idx0].spriteArr[s].seq) {
                state = birdPreset[idx0].spriteArr[s].states[0];
              } else {
                state = birdPreset[idx0].spriteArr[s].state;
              }

              if (state == birdImgData[i].state[j]) {
                totChance = totChance + birdPreset[idx0].spriteArr[s].chance;
                chancePoolArr.push({
                  idx: s,
                  accumChance: totChance
                })
              }

            }

            var rdmChance = parseInt(random() * totChance);

            for (var c = 0; c < chancePoolArr.length; c++) {

              var prevChance;
              if (c == 0) {
                prevChance = 0;
              } else {
                prevChance = chancePoolArr[c - 1].accumChance;
              }

              if (rdmChance >= prevChance && rdmChance < chancePoolArr[c].accumChance) {
                birdImgData[i].spriteIdx[j] = chancePoolArr[c].idx;

                if (birdPreset[idx0].spriteArr[chancePoolArr[c].idx].seq) {
                  birdImgData[i].durCounter[j] = birdPreset[idx0].spriteArr[chancePoolArr[c].idx].dur;
                } else {
                  birdImgData[i].durCounter[j] = idleDur;
                }
                break;
              }

            }

          }
        }
      }
    }

    if (frameCount % 48 == 0) {
      birdPreview = parseInt(random(0, birdImgData[0].userNum));
    }
    image(birdImgData[0].img[birdPreview][0], (1920 - 330) * sc, 250 * sc, 320 * sc, 320 * sc, 3840 / 8, 3840 / 8, 480, 480);

  }


  //print(cursorState);

  var mousePos;
  var mouseImg;
  var mouseSize;
  var mouseSrcPos;
  var mouseSrcSize;

  if (cursorState == 'arrow') {

    mousePos = [mouseX, mouseY];
    mouseImg = assets.icon[0].img;
    mouseSize = [assets.icon[0].img.height * sc,
      assets.icon[0].img.height * sc
    ];
    mouseSrcPos = [0, 0];
    mouseSrcSize = [assets.icon[0].img.height, assets.icon[0].img.height];

  } else if (cursorState == 'pointer') {

    mousePos = [mouseX + assets.icon[0].offset[1][0] * assets.icon[0].img.height * sc,
      mouseY + assets.icon[0].offset[1][1] * assets.icon[0].img.height * sc
    ];
    mouseImg = assets.icon[0].img;
    mouseSize = [assets.icon[0].img.height * sc,
      assets.icon[0].img.height * sc
    ];
    mouseSrcPos = [assets.icon[0].img.height, 0];
    mouseSrcSize = [assets.icon[0].img.height, assets.icon[0].img.height];

  }

  for (var l = 0; l < 5; l++) {

    if (cursorState == assets.toolBar[3 + l].name) {

      mousePos = [mouseX +
        assets.toolBar[3 + l].offset[0] * (assets.toolBar[3 + l].img.width / assets.toolBar[3 + l].type.length) * sc,
        mouseY + assets.toolBar[3 + l].offset[1] * assets.toolBar[3 + l].img.height * sc
      ];
      mouseImg = assets.toolBar[3 + l].img;
      mouseSize = [assets.toolBar[3 + l].img.height * sc,
        assets.toolBar[3 + l].img.height * sc
      ];
      mouseSrcPos = [assets.toolBar[3 + l].img.height, 0];
      mouseSrcSize = [assets.toolBar[3 + l].img.height,
        assets.toolBar[3 + l].img.height
      ];

      break;

    } else if (cursorState == assets.toolBar[3 + l].name + '_hover') {

      mousePos = [mouseX +
        assets.toolBar[3 + l].offset[0] * (assets.toolBar[3 + l].img.width / assets.toolBar[3 + l].type.length) * sc,
        mouseY + assets.toolBar[3 + l].offset[1] * assets.toolBar[3 + l].img.height * sc
      ];
      mouseImg = assets.toolBar[3 + l].img;
      mouseSize = [assets.toolBar[3 + l].img.height * sc,
        assets.toolBar[3 + l].img.height * sc
      ];
      mouseSrcPos = [assets.toolBar[3 + l].img.height * 2, 0];
      mouseSrcSize = [assets.toolBar[3 + l].img.height,
        assets.toolBar[3 + l].img.height
      ];

      break;

    }

  }

  if (savePhoto) {
    saveCanvas(canvas, 'pondSnapshot', 'png');
    assets.toolBar[2].vis[0] = 1;
    assets.toolBar[2].vis[1] = 0;
    savePhoto = 0;
  }

  image(mouseImg, mousePos[0], mousePos[1], mouseSize[0], mouseSize[1], mouseSrcPos[0], mouseSrcPos[1], mouseSrcSize[0], mouseSrcSize[0]);

  push();
  strokeWeight(1);
  stroke('red');
  //line(edge[0], cnv[1] * sc, edge[0] + slant * sc, 0 * sc);
  //line(0, edge[1], cnv[1], edge[1]);
  pop();


}

function mouseClicked() {

  if ((cursorState).includes('tool') &&
    (cursorState).includes('knife') !== true) {

    if ((mouseX > edge[0] + (1 - (mouseY / sc) / cnv[1]) * slant * sc ||
        mouseY < edge[1])) {
      cursorState = 'arrow';
    } else {

    }

  }

  for (var u = 0; u < assets.dlg.length; u++) {

    if ((assets.dlg[u].screen).includes(screen) && assets.dlg[u].vis) { //

      if (assets.dlg[u].name == 'saveButton.png') {

        if (mouseX > assets.dlg[u].pos[0] * sc &&
          mouseY > assets.dlg[u].pos[1] * sc &&
          mouseX < (assets.dlg[u].pos[0] +
            assets.dlg[u].img.width) * sc &&
          mouseY < (assets.dlg[u].pos[1] +
            assets.dlg[u].img.height) * sc) {

          assets.dlg[4].vis = 0;
          assets.dlg[5].vis = 0;
          savePhoto = 1;

          break;

        }

      } else if (assets.dlg[u].name == 'sellButton_0.png') {

        if (mouseX > assets.dlg[u].pos[0] * sc &&
          mouseY > assets.dlg[u].pos[1] * sc &&
          mouseX < (assets.dlg[u].pos[0] +
            assets.dlg[u].img.width) * sc &&
          mouseY < (assets.dlg[u].pos[1] +
            assets.dlg[u].img.height) * sc) {

          assets.dlg[0].vis = 0;
          assets.dlg[1].vis = 0;
          assets.dlg[2].vis = 0;
          assets.dlg[7].vis = 1;
          gameOver = 1;

          break;

        }

      } else if (assets.dlg[u].name == 'sellButton_1.png') {

        if (mouseX > assets.dlg[u].pos[0] * sc &&
          mouseY > assets.dlg[u].pos[1] * sc &&
          mouseX < (assets.dlg[u].pos[0] +
            assets.dlg[u].img.width) * sc &&
          mouseY < (assets.dlg[u].pos[1] +
            assets.dlg[u].img.height) * sc) {

          assets.dlg[0].vis = 0;
          assets.dlg[1].vis = 0;
          assets.dlg[2].vis = 0;

          break;

        }

      } else if (assets.dlg[u].name == 'dlgBox_lanyi.png') {

        if (mouseX < assets.dlg[u].pos[0] * sc ||
          mouseY < assets.dlg[u].pos[1] * sc ||
          mouseX > (assets.dlg[u].pos[0] +
            assets.dlg[u].img.width) * sc ||
          mouseY > (assets.dlg[u].pos[1] +
            assets.dlg[u].img.height) * sc) {

          assets.dlg[3].vis = 0;

          break;

        }

      } else if (assets.dlg[u].name == 'casette.png') {

        if (mouseX < assets.dlg[u].pos[0] * sc ||
          mouseY < assets.dlg[u].pos[1] * sc ||
          mouseX > (assets.dlg[u].pos[0] +
            assets.dlg[u].img.width) * sc ||
          mouseY > (assets.dlg[u].pos[1] +
            assets.dlg[u].img.height) * sc) {

          assets.dlg[6].vis = 0;

          break;

        }

      } else if (assets.dlg[u].name == 'dlgBox_score.png') {

        if (mouseX < assets.dlg[u].pos[0] * sc ||
          mouseY < assets.dlg[u].pos[1] * sc ||
          mouseX > (assets.dlg[u].pos[0] +
            assets.dlg[u].img.width) * sc ||
          mouseY > (assets.dlg[u].pos[1] +
            assets.dlg[u].img.height) * sc) {

          assets.dlg[8].vis = 0;
          screen = 2;

          break;

        }

      }

    } //

  }

  if (dlgOn == 0) { ///

    for (var r = 0; r < assets.envir.length; r++) {

      var breakCueAll = 0;

      if ((assets.envir[r].screen).includes(screen) && assets.envir[r].vis) { //

        if (assets.envir[r].name == 'oxyMachine.png' && cursorState == 'pointer') {

          for (var p = 0; p < assets.envir[r].mult; p++) {

            if (mouseX > assets.envir[r].pos[p][0] * sc &&
              mouseY > assets.envir[r].pos[p][1] * sc &&
              mouseX < (assets.envir[r].pos[p][0] +
                assets.envir[r].img.width / assets.envir[r].type.length) * sc &&
              mouseY < (assets.envir[r].pos[p][1] +
                assets.envir[r].img.width / assets.envir[r].type.length) * sc) {

              if (assets.envir[r].turnedOn[p]) {
                assets.envir[r].turnedOn[p] = 0;
                assets.envir[r].vis[p][0] = 1;
                assets.envir[r].vis[p][1] = 0;
                assets.envir[r].vis[p][2] = 0;
                assets.envir[r].vis[p][3] = 0;
                assets.envir[r].vis[p][4] = 0;
              } else {
                assets.envir[r].turnedOn[p] = 1;
                assets.envir[r].vis[p][0] = 0;
                assets.envir[r].vis[p][1] = 1;
              }

              score.oxy = score.oxy + 0.30;

              breakCueAll = 1;
              break;

            }

          }

        } else if (assets.envir[r].name == 'agent.png') {
          if (mouseX > assets.envir[r].pos[0] * sc &&
            mouseY > assets.envir[r].pos[1] * sc &&
            mouseX < (assets.envir[r].pos[0] +
              assets.envir[r].img.width) * sc &&
            mouseY < (assets.envir[r].pos[1] +
              assets.envir[r].img.height) * sc) {
            assets.dlg[0].vis = 1;
            assets.dlg[1].vis = 1;
            assets.dlg[2].vis = 1;
            cursorState = 'arrow';
            break;
          }
        } else if (assets.envir[r].name == 'lanyi.png') {
          if (mouseX > assets.envir[r].pos[0] * sc &&
            mouseY > assets.envir[r].pos[1] * sc &&
            mouseX < (assets.envir[r].pos[0] +
              assets.envir[r].img.width) * sc &&
            mouseY < (assets.envir[r].pos[1] +
              assets.envir[r].img.height) * sc) {
            assets.dlg[3].vis = 1;
            cursorState = 'arrow';
            break;
          }
        } else if (assets.envir[r].name == 'casetteIcon.png') {
          if (mouseX > assets.envir[r].pos[0] * sc &&
            mouseY > assets.envir[r].pos[1] * sc &&
            mouseX < (assets.envir[r].pos[0] +
              assets.envir[r].img.width) * sc &&
            mouseY < (assets.envir[r].pos[1] +
              assets.envir[r].img.height) * sc) {
            assets.dlg[6].vis = 1;
            cursorState = 'arrow';
            break;
          }
        } else if ((assets.envir[r].name).includes('grass')) {
          if (mouseX > assets.envir[r].pos[0] * sc &&
            mouseY > assets.envir[r].pos[1] * sc &&
            mouseX < (assets.envir[r].pos[0] +
              assets.envir[r].img.width / assets.envir[r].type.length) * sc &&
            mouseY < (assets.envir[r].pos[1] +
              assets.envir[r].img.height * 0.75) * sc) {

            if (cursorState.includes('knife') &&
              cursorState.includes('hover')) {

              cursorState = 'arrow';
              assets.envir[r].vis[0] = 0;
              assets.envir[r].vis[1] = 1;
              break;
            }
          } else {

            if (cursorState.includes('knife') &&
              cursorState.includes('hover') !== true) {
              cursorState = 'arrow';
            }

          }

        } else if (assets.envir[r].name == 'harvest.png' && assets.envir[r].vis[1]) {
          if (mouseX > assets.envir[r].pos[0] * sc &&
            mouseY > assets.envir[r].pos[1] * sc &&
            mouseX < (assets.envir[r].pos[0] +
              assets.envir[r].img.width / assets.envir[r].type.length) * sc &&
            mouseY < (assets.envir[r].pos[1] +
              assets.envir[r].img.height) * sc) {
            assets.dlg[8].vis = 1;
            assets.envir[r].vis[1] = 0;
            assets.envir[r].vis[2] = 1;

            cursorState = 'arrow';
            break;
          }
        }

      } //

      if (breakCueAll) {
        break;
      }

    }

    for (var w = 0; w < assets.toolBar.length; w++) {

      if ((assets.toolBar[w].screen).includes(screen)) { //

        if (typeof assets.toolBar[w].type == 'object') {

          for (var k = 0; k < assets.toolBar[w].type.length; k++) {

            if (assets.toolBar[w].type[k] == 'button') {

              if (mouseX > assets.toolBar[w].pos[0] * sc &&
                mouseY > assets.toolBar[w].pos[1] * sc &&
                mouseX < (assets.toolBar[w].pos[0] +
                  assets.toolBar[w].img.width / assets.toolBar[w].type.length) * sc &&
                mouseY < (assets.toolBar[w].pos[1] +
                  assets.toolBar[w].img.height) * sc) {

                if (assets.toolBar[w].name == 'tool_camera.png') {
                  savePhoto = 1;
                  cursorState = 'arrow';
                } else {
                  cursorState = assets.toolBar[w].name;
                }

                break;

              }

            }

          }

        }

      } // 

    }

    if (cursorState.includes('hover') &&
      cursorState.includes('knife') !== true &&
      mouseX > 0 &&
      mouseY < cnv[1] * sc &&
      mouseX < edge[0] + (1 - (mouseY / sc) / cnv[1]) * slant * sc &&
      mouseY > edge[1]) {

      if (cursorState == 'tool_ash.png_hover') {
        score.ph = 1;
        score.toxin = 0;
      } else if (cursorState == 'tool_bread.png_hover') {
        score.wu.healthy = min(score.wu.healthy + 0.5 * random(), 1);
        score.wan.healthy = min(score.wan.healthy + 0.5 * random(), 1);
      } else if (cursorState == 'tool_peanut.png_hover') {
        score.wu.healthy = min(score.wu.healthy + 0.5 * random(), 1);
        score.wan.healthy = min(score.wan.healthy + 0.5 * random(), 1);
      } else if (cursorState == 'tool_tea.png_hover') {
        score.toxin = 0;
      }

      cursorState = 'arrow';

    }

  } ///

}
