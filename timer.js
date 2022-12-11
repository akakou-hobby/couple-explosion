async function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const TIMER_DURATION = 500

class TimerLock {
    constructor() {
        this.isLocked = false
    }

    lock() {
        const self = this
        this.isLocked = true

        setTimeout(() => {
            self.isLocked = false
        }, TIMER_DURATION)
    }


}

const timer = new TimerLock()
