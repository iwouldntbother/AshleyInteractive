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

    const newImage = (data) => {
      const imageContainer = document.getElementById('imageContainer');
      let image = document.createElement('img')
      image.src = data;
      // image.className = 'animate'
      

      imageContainer.prepend(image);
    }