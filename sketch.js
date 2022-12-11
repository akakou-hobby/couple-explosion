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

    poseNet = ml5.poseNet(video, {
    minConfidence: 0.9,
        detectionType: "multiple",
        maxPoseDetections: 2,

    }, modelReady);

}

function draw() {
    image(video, 0, 0, WIDTH, HEIGHT)
    // console.log(2)

    drawPoseNet()

    // image(video, 0, 0, WIDTH, HEIGHT);
    for (const explosion of explosions) {
        explosion.draw()
    }
}

