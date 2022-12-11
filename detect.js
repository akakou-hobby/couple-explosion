const THRESHOLD = 0.5
const EXPLOSION_SCALE = 2

const LEFT_EAR = 3
const RIGHT_EAR = 4

const LEFT_SHOLDER = 5
const RIGHT_SHOLDER = 6

const LEFT_WLIST = 9
const RIGHT_WLIST = 10

const NOSE = 0

function calcEuqurideanDistance(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
}

function calcFaceWidth(keypoints) {
    const x = keypoints[LEFT_EAR].position.x
    const width = keypoints[RIGHT_EAR].position.x - x

    return Math.abs(width)
}

function calcCoupleXPositionVector(keypointsA, keypointsB) {
    const leftA = keypointsA[LEFT_SHOLDER].position.x
    const leftB = keypointsB[LEFT_SHOLDER].position.x

    const rightA = keypointsA[RIGHT_SHOLDER].position.x
    const rightB = keypointsB[RIGHT_SHOLDER].position.x


    const unSubedX = leftA < leftB ? leftA : leftB

    const a1 = Math.abs(leftA - rightB)
    const a2 = Math.abs(rightA - leftB)

    const unscaledWidth = a1 > a2 ? a1 : a2

    const x = unSubedX - unscaledWidth * 3 / 4
    const width = unscaledWidth * EXPLOSION_SCALE

    return { x, width }
}

function isShakeHand(keypointsA, keypointsB) {
    const distance1 = calcEuqurideanDistance(keypointsA[LEFT_WLIST].position, keypointsB[RIGHT_WLIST].position)
    const distance2 = calcEuqurideanDistance(keypointsA[RIGHT_WLIST].position, keypointsB[LEFT_WLIST].position)

    const distance = distance1 < distance2 ? distance1 : distance2

    const width1 = calcFaceWidth(keypointsA)
    const width2 = calcFaceWidth(keypointsB)

    const width = width1 > width2 ? width1 : width2

    console.log(distance, width)
    return distance < width * THRESHOLD
}

function modelReady() {
    poseNet.on('pose', function (poses) {
        // if (timer.count % 3 || !timer.isNew()) return
        timer.commit()

        setPoses(poses)
        if (poses.length != 2 || !isShakeHand(poses[0].pose.keypoints, poses[1].pose.keypoints)) return

        const vec = calcCoupleXPositionVector(poses[0].pose.keypoints, poses[1].pose.keypoints)

        const x = vec.x
        const width = vec.width

        const y = poses[0].pose.keypoints[LEFT_SHOLDER].position.y - width / EXPLOSION_SCALE
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
    });

}


