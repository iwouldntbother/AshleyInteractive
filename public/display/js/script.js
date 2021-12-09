var socket = io();

    socket.on('newImage', (imageString) => {
      // console.log(imageString)
      
      newImage(imageString);

    })

    socket.on('newImageText', (previewString) => {
      console.log(previewString.trim());


      const imageContainer = document.getElementById('imageContainer')
      
      let holder = document.createElement('div')
      holder.innerHTML = previewString.trim();

      imageContainer.prepend(holder);
      // imageContainer.prepend(previewString);
      // document.getElementById('imageContainer').innerHTML = previewString + document.getElementById('imageContainer').innerHTML
      // let currentImageGrid = document.getElementById('imageContainer').innerHTML
      // document.getElementById('imageContainer').innerHTML = currentImageGrid + previewString
    })

    socket.on('newObjectArray', (previewData) => {
      // console.log(JSON.parse(previewData));
      let previewDataParsed = JSON.parse(previewData)

      // Create preview holder
      let previewContainer = document.createElement('div')
      previewContainer.className = 'previewContainer';

      // Add name text
      let previewLabel = document.createElement('p')
      previewLabel.className = 'previewLabel';
      let previewLabelText = document.createTextNode(previewDataParsed.name + "'s Morning Routine!")
      previewLabel.append(previewLabelText);

      previewContainer.appendChild(previewLabel);
      
      // Create gridHolder
      let gridHolder = document.createElement('div')
      gridHolder.className = 'iconGridHolder';

      // Add icon to grid for each in array ( Check for custom or ref icon data.js object ../.. )

      // Start Icon
      // let startIcon = document.createElement('div');
      // startIcon.className = 'gridItem';

      // let startIconText = document.createElement('p');
      // startIconText.className = 'iconText';

      // let startIconTextData = document.createTextNode('Start')
      // startIconText.append(startIconTextData);

      // startIcon.appendChild(startIconText);
      // gridHolder.appendChild(startIcon);

      // Auto fill grid
      for (var i=0; i<previewDataParsed.gridArray.length; i++) {
        // console.log(previewDataParsed.gridArray[i].ID);
        if (previewDataParsed.gridArray[i].ID == 'custom') {
          gridHolder.appendChild(createIcon(previewDataParsed.gridArray[i].IconImage, previewDataParsed.gridArray[i].IconText, true))
        } else {
          gridHolder.appendChild(createIcon('.'+data.icons[Number(previewDataParsed.gridArray[i].ID)].iconImage, data.icons[Number(previewDataParsed.gridArray[i].ID)].name, false))
        }
      }

      // End Icon
      // let endIcon = document.createElement('div');
      // endIcon.className = 'gridItem';

      // let endIconText = document.createElement('p');
      // endIconText.className = 'iconText';

      // let endIconTextData = document.createTextNode('End')
      // endIconText.append(endIconTextData);

      // endIcon.appendChild(endIconText);
      // gridHolder.appendChild(endIcon);

      previewContainer.appendChild(gridHolder);

      // Add preview to routine grid
      document.getElementById('imageContainer').prepend(previewContainer);


    })

    const createIcon = (icon, text, custom) => {
      let iconEl = document.createElement('div');
      iconEl.className = 'gridItem';

      let iconIMG = document.createElement('img');
      if (custom) {
        iconIMG.className = 'iconIMGCustom';
      } else {
        iconIMG.className = 'iconIMG';
      }
      iconIMG.src = icon;

      let iconText = document.createElement('p');
      iconText.className = 'iconText';

      let iconTextData = document.createTextNode(text)
      iconText.append(iconTextData);

      iconEl.appendChild(iconIMG);
      iconEl.appendChild(iconText);

      return iconEl;
    }

    const newImage = (data) => {
      const imageContainer = document.getElementById('imageContainer');
      let image = document.createElement('img')
      image.src = data;
      // image.className = 'animate'
      

      imageContainer.prepend(image);
    }