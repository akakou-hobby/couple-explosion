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
