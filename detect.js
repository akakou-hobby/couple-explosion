async function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

async function startDetecting() {
    // const status = document.getElementById('status')
    // status.innerText = 'モデルを読み込んだ';

    while (true) {
        await sleep(2000)
        const results = await detect();
        generateExplosion(results);
    }
}

function detect() {
    return new Promise((resolve, reject) => {
        detector.detect(video, function (err, results) {
            if (err) {
                reject(err)
            }

            resolve(results)
        });
    })
}

function generateExplosion(objects) {
    // console.log(objects)
    for (const object of objects) {
        if (object.label != 'person') return

        const explosion = new Expolosion(
            explosions.length,
            object.x,
            object.y,
            object.width,
            object.height)

        // console.log("objects: ", object)
        // console.log("explosion: ", explosion)

        explosion.play()
        explosions.push(explosion)
    }
}