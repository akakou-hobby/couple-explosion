async function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function modelReady() {
    poseNet.on('pose', function (poses) {
        setPoses(poses)

        for (const pose of poses) {
            // console.log(pose)

            // const explosion = new Expolosion(
            //     explosions.length,
            //     object.x,
            //     object.y,
            //     object.width,
            //     object.height)

            // console.log("objects: ", object)
            // console.log("explosion: ", explosion)

            // explosion.play()
            // explosions.push(explosion)
        }
    });

}


