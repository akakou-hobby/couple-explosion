const WIDTH = 640
const HEIGHT = 480

function preload() {
    SOUND = loadSound('./assets/explosion.mp3')
}

async function setup() {
    video = createCapture(VIDEO);
    createCanvas(WIDTH, HEIGHT);
    video.size(WIDTH, HEIGHT)
    video.hide();

    detector = ml5.objectDetector('cocossd', startDetecting);
}

function draw() {
    image(video, 0, 0, WIDTH, HEIGHT);
    console.log(2)

    // image(video, 0, 0, WIDTH, HEIGHT);
    for (const explosion of explosions) {
        explosion.draw()
    }
}

