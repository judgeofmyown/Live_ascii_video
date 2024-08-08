const video = document.getElementById('webcam')
// const density = "$@B%8&WM#*0987654321ZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,^`'........................................";
const density = "@#$%O0987654321!|/:,.^'---------`````````";
const canvas = document.getElementById("image-container")
const ctx = canvas.getContext('2d')

navigator.mediaDevices.getUserMedia({ video: {width: 400, height: 400} })
    .then(stream => {
        video.srcObject = stream;
        video.play();
        video.addEventListener("loadedmetadata", function (e) {
            console.log(video.videoHeight, video.videoWidth)
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            processVideo();
        });
    })
    .catch(err => console.log('Error accessing webcam: ', err));


function processVideo () {
    const drawFrame = () => { 
        ctx.drawImage(video, 0, 0)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const imageArray = imageData.data

        let asciiArt = '';
        for (let y = 0; y < canvas.height; y++){
            for (let x = 0; x <canvas.width; x++){
                const pictueIndex = (x + y*canvas.width) * 4
                const red = imageArray[pictueIndex]
                const green = imageArray[pictueIndex + 1]
                const blue = imageArray[pictueIndex + 2]

                const gray = 0.3 * red + 0.59 * green + 0.11 * blue;

                const asciiIndex = Math.floor(((density.length-1)/255)*gray)
                const asciiValue = density[asciiIndex]
                asciiArt += asciiValue
            }
            asciiArt += '\n';
        }
        document.getElementById('ascii-image').textContent = asciiArt;
        requestAnimationFrame(drawFrame);
    }
    drawFrame();
}
    