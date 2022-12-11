let video;
let yolo;
let objects = [];

function setup() {
    createCanvas(320, 240);
    video = createCapture(VIDEO);
    video.size(320, 240);

    yolo = ml5.YOLO(video, startDetecting);

    video.hide();
}


