async function startDetecting() {
    const status = select('#status');
    status.html('モデルを読み込んだ');

    while (true) {
        await detect();
        render();
    }
}

function detect() {
    return new Promise(resolve => {
        yolo.detect(function (err, results) {
            objects = results;
            console.log(objects)
            resolve()
        });
    })
}

function render() {
    image(video, 0, 0, width, height);

    for (let i = 0; i < objects.length; i++) {
        noStroke();
        fill(0, 255, 0);

        text(objects[i].className, objects[i].x * width, objects[i].y * height - 5);
        noFill();
        strokeWeight(4);
        stroke(0, 255, 0);

        rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);
    }
}