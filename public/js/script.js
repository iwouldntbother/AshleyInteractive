// Fix vh units for mobile

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  // let vh = window.screen.height * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// Icon Carousel Builder

const iconCarouselBuilder = () => {
  for (var i=0; i < data.icons.length; i++) {
    const iconHolderDIV = document.createElement('div');
    iconHolderDIV.className = 'iconHolder textColour';
    iconHolderDIV.id = 'iconHolder' + ("00" + i).slice(-2);
    
    const iconIMG = document.createElement('img');
    iconIMG.className = 'iconImage';
    iconIMG.src = data.icons[i].iconImage;
    iconHolderDIV.appendChild(iconIMG);
    
    const iconText = document.createElement('p');
    iconText.className = 'iconText';
    const iconTextData = document.createTextNode(data.icons[i].name);
    iconText.appendChild(iconTextData);

    iconHolderDIV.appendChild(iconText)

    document.getElementById('iconCarousel').appendChild(iconHolderDIV);
  }
}

iconCarouselBuilder();

// Icon clicked event

document.getElementById('iconCarousel').addEventListener('click', (e) => {
  // console.log(e.target.id);
  if (e.target.id.includes('iconHolder')) {
    // console.log(e.target.id.replace('iconHolder',''))
    addIconToGrid(e.target.id.replace('iconHolder',''))
  } else if (e.target.id == 'customIcon') {
    // console.log('Custom Icon Clicked')
    loadCustomiser();
  }
})

// if (target == document.getElementById('binHolder')) {
//   el.remove();
// }

const drake = dragula([document.getElementById('iconGridContainer'), document.getElementById('binHolder')], {
  invalid: function (el, handle) {
    return el.classList.contains('noDrag');
  },
  accepts: function (el, target, source, sibling) {
    // console.log(sibling.id)
    if (sibling && sibling.id == 'startItem') {
      return false;
    } else {
      return true;
    }
  },
  moves: function(el, source, handle, sibling) {
    if (el == document.getElementById('startItem') || el == document.getElementById('endItem')) {
      return false;
    } else {
      return true;
    }
  }
});

var gridArray = []
const gridLimit = 30;

const addIconToGrid = (iconID) => {

  if (gridArray.length == (gridLimit - 2)) {
    return;
  }

  const grid = document.getElementById('iconGridContainer');
  const endItem = document.getElementById('endItem');

  const gridItemDIV = document.createElement('div');
  gridItemDIV.className = 'gridItem textColour';
  gridItemDIV.setAttribute('data-id', iconID);
  gridItemDIV.setAttribute('data-pos', gridArray.length);

  const gridIMG = document.createElement('img');
  gridIMG.className = 'gridImage';
  gridIMG.src = data.icons[Number(iconID)].iconImage;
  gridItemDIV.appendChild(gridIMG);
  
  const iconText = document.createElement('p');
  iconText.className = 'gridText';
  const iconTextData = document.createTextNode(data.icons[Number(iconID)].name);
  iconText.appendChild(iconTextData);

  gridItemDIV.appendChild(iconText);

  grid.insertBefore(gridItemDIV, endItem);

  gridArray.push(Number(iconID));
}

const arrayMove = (arr, oldIndex, newIndex) => {
  if (newIndex >= arr.length) {
      var k = newIndex - arr.length + 1;
      while (k--) {
          arr.push(undefined);
      }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  // return arr; // for testing
};

const updateArray = () => {
  for (var i=0; i<gridArray.length; i++) {
    document.getElementById('iconGridContainer').children[i + 1].setAttribute('data-pos', i);
  }
}

drake.on('drop', (el, target, source, sibling) => {
  const index = [...el.parentElement.children].indexOf(el);

  if (target == document.getElementById('binHolder')) {
    gridArray.splice((index + 1), 1)
    el.remove();
    updateArray();
    return;
  }

  // console.log(gridArray);
  // console.log(el.getAttribute('data-id') + ' was moved from ' + el.getAttribute('data-pos') + ' to ' + (index-1));
  arrayMove(gridArray, el.getAttribute('data-pos'), (index - 1));
  // console.log(gridArray);
})

// drake.canMove(document.getElementById('startItem')) = false;





// p5.js Code

var penWidth; // 4 - Normal, 10 - Large (Eraser)
var penColour; // 0 - Black, 220 - Background (Eraser)
var runSetup = true;

const reloadCanvas = () => {
  const oldCanvas = document.getElementById('defaultCanvas0')
  if (oldCanvas) {
    oldCanvas.remove();
  }
  runSetup = true;
  setup();
}

function setup() {
  if (runSetup) {
    var canvas = createCanvas(windowWidth, windowWidth);
    canvas.parent('customCanvas');
    penWidth = 10;
    penColour = 0;
    clear();
    runSetup = false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowWidth);
}


function draw() {
  // console.log(penWidth)
  strokeWeight(Number(penWidth));
  stroke(Number(penColour));
  line(mouseX, mouseY, pmouseX, pmouseY);
}



document.getElementById('canvasToolBar').addEventListener('click', (e) => {
  let id = e.target.id;
  const brushSizeOutput = document.getElementById('brushSize');
  switch (id) {
    case 'penTool':
      noErase();
      penColour = 0;
      break;

    case 'eraseTool':
      erase();
      break;
  
    case 'clearTool':
      clear();
      break;

    case 'brushToolPlus':
      penWidth++;
      brushSizeOutput.innerHTML = penWidth;
      break;

    case 'brushToolMinus':
      penWidth--;
      brushSizeOutput.innerHTML = penWidth;
      break;

    case 'saveBTN':
      reloadCanvas();
      break;

    default:
      break;
  }
})


document.getElementById('customIconMenuBar').addEventListener('click', (e) => {
  const canvas = document.getElementById('defaultCanvas0');
  const textInput = document.getElementById('iconTextInput');
  const customContainer = document.getElementById('customIconContainer');
  switch (e.target.id) {
    case 'customCancelBTN':
      customContainer.style.display = 'none';
      break;
  
    case 'customDoneBTN':
      addCustomIconToGrid(canvas.toDataURL(), textInput.value);
      console.log(canvas.toDataURL());
      customContainer.style.display = 'none';
      break;
  
    default:
      break;
  }
})

const addCustomIconToGrid = (iconCustomIMG, iconCustomText) => {

  if (gridArray.length == (gridLimit - 2)) {
    return;
  }

  const grid = document.getElementById('iconGridContainer');
  const endItem = document.getElementById('endItem');

  const gridItemDIV = document.createElement('div');
  gridItemDIV.className = 'gridItem textColour';
  gridItemDIV.setAttribute('data-id', 'custom');
  gridItemDIV.setAttribute('data-pos', gridArray.length);

  const gridIMG = document.createElement('img');
  gridIMG.className = 'gridImage';
  gridIMG.src = iconCustomIMG;
  gridItemDIV.appendChild(gridIMG);
  
  const iconText = document.createElement('p');
  iconText.className = 'gridText';
  const iconTextData = document.createTextNode(iconCustomText);
  iconText.appendChild(iconTextData);

  gridItemDIV.appendChild(iconText);

  grid.insertBefore(gridItemDIV, endItem);

  gridArray.push('custom');
}

const loadCustomiser = () => {
  reloadCanvas();
  document.getElementById('iconTextInput').value = '';
  document.getElementById('iconTextInput').setAttribute('placeholder', 'Icon Text');
  document.getElementById('customIconContainer').style.display = 'block'
}

let nameText = 'Ashley'
let timeStart = new Date();

const previewGen = async () => {
  return await new Promise(res => {

    const submittedContainer = document.getElementById('submittedContainer')
    const previewContainer = document.getElementById('previewContainer')

    let grid = document.getElementById('iconGridContainer')
    let previewGrid = grid.cloneNode(true)

    let previewTitle = document.createElement('h1')
    let previewTitleText = document.createTextNode(nameText + "'s Morning Routine!");
    previewTitle.appendChild(previewTitleText)

    previewContainer.appendChild(previewTitle);
    previewContainer.appendChild(previewGrid);

    submittedContainer.style.display = 'flex';

    res();
  })
}

const submit = async () => {
  var preview = document.getElementById('previewContainer');

  await previewGen();

  setTimeout(() => {
    domtoimage.toPng(preview)
    .then((dataURL) => {
      // console.log(dataURL);
      postData(dataURL);
    })
    .catch((e) => {
      console.log('DomToImage Error!', e)
    })
  }, 5000)

}


const submitPureText = async () => {
  var preview = document.getElementById('previewContainer');

  await previewGen();

  console.log(preview);
  postDataText(String(preview));

}

const postDataText = (data) => {
  var submitTime = new Date().toISOString().replace('T', '/').split('.')[0];
  var timeSpent = msToTime(new Date().getTime() - timeStart.getTime())
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/newImageText', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({'imageText': data, 'name': nameText, 'time': submitTime, 'timeSpent': timeSpent}));
}

function msToTime(duration) {
  var milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

// Send data to server

const postData = (data) => {
  var submitTime = new Date().toISOString().replace('T', '/').split('.')[0];
  var timeSpent = msToTime(new Date().getTime() - timeStart.getTime())
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/newImage', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({'image': data, 'name': nameText, 'time': submitTime, 'timeSpent': timeSpent}));
}

document.getElementById('submitBTN').addEventListener('click', () => {
  submit();
  // submitPureText();
})

document.getElementById('nameSubmit').addEventListener('click', () => {
  console.log('Clicked!');
  const nameInput = document.getElementById('nameInput');

  if (nameInput.value.trim().length === 0) {
    return;
  } else {
    nameText = nameInput.value;
    document.getElementById('introContainer').remove();
    console.log('Removed!');
  }

})


// Theme Switch

let theme = 'light'


const switchLights = () => {
  let root = document.documentElement;

  if (theme === 'light') {
    root.style.setProperty('--text', 'white')
    root.style.setProperty('--bg', '#212529')
    theme = 'dark'
  } else {
    root.style.setProperty('--text', 'black')
    root.style.setProperty('--bg', 'white')
    theme = 'light'
  }

}


document.getElementById('lightSwitch').addEventListener('click', () => {
  switchLights();
})

document.getElementById('infoBTN').addEventListener('click', () => {
  console.log('Info????')
  // openInfoPage();
})

// TODO:
// Style