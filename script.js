const img = new Image()
const button2 = document.getElementById('button2')
const canvas = document.getElementById('canvas1')
const ctx =canvas.getContext('2d');

img.src = 'noel.jpg';
canvas.width = img.width;
canvas.height = img.height;
img.addEventListener('load', function () {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
})

button2.addEventListener('click',function(){
    console.time()
    const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(scannedImage)
    const scannedData = scannedImage.data;
    for(let i=0; i < scannedData.length; i+=4){
        let x = parseInt(i/(canvas.width*2))
        if(x%2==0) {
            scannedData[i] = 255-scannedData[i];
            scannedData[i + 1] = 255-scannedData[i+1];
            scannedData[i + 2] = 255-scannedData[i+2];
        }
        else {
            x=x+2;
        }
    }

    scannedImage.data = scannedData;
    ctx.putImageData(scannedImage, 0, 0);
    console.timeEnd()
    setTimeout(() => {
        document.location.reload();
    }, 500);
}, {once : true})

button1.addEventListener('click',function(){
    console.time()
    const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(scannedImage)
    for (i=0; i<scannedImage.height; i++) {
        for (j = 0; j < scannedImage.width / 2; j++) {
            var index = (i * 4) * scannedImage.width + (j * 4);
            var mirrorIndex = ((i + 1) * 4) * scannedImage.width - ((j + 1) * 4);
            for (p = 0; p < 4; p++) {
                var temp = scannedImage.data[index + p];
                scannedImage.data[index + p] = scannedImage.data[mirrorIndex + p];
                scannedImage.data[mirrorIndex + p] = temp;
            }
        }
    }
        const scannedData = scannedImage.data;
        for (let i = 0; i < scannedData.length; i += 4) {
            scannedData[i] = 255-scannedData[i];
            scannedData[i + 1] = 255-scannedData[i+1];
            scannedData[i + 2] = 255-scannedData[i+2];
        }
        ctx.putImageData(scannedImage, 0, 0, 0, 0, scannedImage.width, scannedImage.height);
    console.timeEnd()
    setTimeout(() => {
        document.location.reload();
    }, 500);
}, {once : true});


