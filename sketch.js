function preload() {
    SOUND = loadSound('./assets/explosion.mp3')
}

async function setup() {
    video = createCapture(VIDEO);
    video.hide();

    await sleep(3000)

    WIDTH = video.width
    HEIGHT = video.height

    createCanvas(WIDTH, HEIGHT);

    detector = ml5.objectDetector('cocossd', startDetecting);
}

function draw() {
    image(video, 0, 0, WIDTH, HEIGHT);
    // console.log(2)

    // image(video, 0, 0, WIDTH, HEIGHT);
    for (const explosion of explosions) {
        explosion.draw()
    }
}

