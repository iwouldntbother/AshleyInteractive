var socket = io();

    socket.on('newImage', (imageString) => {
      // console.log(imageString)
      newImage(imageString);
    })

    const newImage = (data) => {
      const imageContainer = document.getElementById('imageContainer');
      let image = document.createElement('img')
      image.src = data;
      // image.className = 'animate'
      

      imageContainer.prepend(image);
    }