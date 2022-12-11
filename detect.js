const LEFT_SHOLDER = 5
const RIGHT_SHOLDER = 6




function modelReady() {
    poseNet.on('pose', function (poses) {
        if (timer.count % 3 || !timer.isNew()) return
        timer.commit()

        setPoses(poses)

        for (const pose of poses) {

            const x = pose.pose.keypoints[LEFT_SHOLDER].position.x
            const width = pose.pose.keypoints[RIGHT_SHOLDER].position.x - x
            const y = pose.pose.keypoints[LEFT_SHOLDER].position.y
            const height = width

            // console.log(pose)

            const explosion = new Expolosion(
                explosions.length,
                x,
                y,
                width,
                height)

            // console.log("objects: ", object)
            // console.log("explosion: ", explosion)

            explosion.play()
            explosions.push(explosion)
        }
    });

}


