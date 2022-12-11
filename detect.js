const LEFT_SHOLDER = 5
const RIGHT_SHOLDER = 6

async function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

class Timer {
    constructor() {
        this.count = 0

        // todo: rename
        this.past = 0
    }

    start() {
        const self = this

        setInterval(() => {
            self.count++
        }, 1000)
    }

    commit() {
        this.past = this.count
    }

    isNew() {
        return this.past < this.count
    }
}

const timer = new Timer()
timer.start()


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


