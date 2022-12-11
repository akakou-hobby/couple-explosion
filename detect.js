const HAND_SHAKE_THRESHOLD = 0.4
const SAME_USER_THRESHOLD = 1

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

function isSamePosition(ax, ay, bx, by, keypointsA, keypointsB, threshold) {
    const distance1 = calcEuqurideanDistance(ax, ay)
    const distance2 = calcEuqurideanDistance(bx, by)

    const distance = distance1 < distance2 ? distance1 : distance2

    const width1 = calcFaceWidth(keypointsA)
    const width2 = calcFaceWidth(keypointsB)

    const width = width1 > width2 ? width1 : width2

    return distance < width * threshold
}

function isSamePerson(keypointsA, keypointsB) {
    return isSamePosition(keypointsA[LEFT_SHOLDER].position, keypointsB[LEFT_SHOLDER].position,
        keypointsA[RIGHT_EAR].position, keypointsB[RIGHT_EAR].position,
        keypointsA, keypointsB, SAME_USER_THRESHOLD
    )
}

function isShakeHand(keypointsA, keypointsB) {
    return isSamePosition(keypointsA[LEFT_WLIST].position, keypointsB[RIGHT_WLIST].position,
        keypointsA[RIGHT_WLIST].position, keypointsB[LEFT_WLIST].position,
        keypointsA, keypointsB, HAND_SHAKE_THRESHOLD
    )
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


function modelReady() {
    poseNet.on('pose', function (poses) {
        setPoses(poses)

        if (poses.length != 2 || !isShakeHand(poses[0].pose.keypoints, poses[1].pose.keypoints)) return
        if (isSamePerson(poses[0].pose.keypoints, poses[1].pose.keypoints)) return;

        if (timer.isLocked) return
        timer.lock()

        const vec = calcCoupleXPositionVector(poses[0].pose.keypoints, poses[1].pose.keypoints)

        const x = vec.x
        const width = vec.width

        const y = poses[0].pose.keypoints[LEFT_SHOLDER].position.y - width / EXPLOSION_SCALE
        const height = width

        const explosion = new Expolosion(
            explosions.length,
            x,
            y,
            width,
            height)

        explosion.play()
        explosions.push(explosion)
    });

}


