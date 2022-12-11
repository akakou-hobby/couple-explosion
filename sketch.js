
async function setup() {
    createCanvas(640, 480);

    video = createCapture(VIDEO);
    createCanvas(640, 480);
    video.hide();

    detector = ml5.objectDetector('cocossd', startDetecting);
}

function draw() {

    // image(video, 0, 0, width, height);
    image(video, 0, 0);

    for (const explosion of explosions) {
        explosion.draw()
    }
}

