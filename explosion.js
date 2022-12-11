class Expolosion {
    constructor(index, x, y, width, height) {
        this.index = index
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.imageSize = width > height ? width : height
    }

    delete() {
        const index = explosions.findIndex((element) => element.index == this.index)

        console.log(index)
        explosions.splice(index, index)
    }

    play() {
        this.img = loadImage('./assets/explosion.gif')
        this.img.resize(this.imageSize, this.imageSize);
        this.img.play()
        SOUND.play()
    }

    draw() {
        if (!this.img.gifProperties) return

        if (!this.img.gifProperties.playing) {
            this.delete()
            return
        }

        const x = this.x + (this.width - this.imageSize) / 2

        // if (this.img.gifProperties && this.img.gifProperties.playing) {
        this.showDetection()
        image(this.img, x, this.y, this.imageSize, this.imageSize);
        // }
    }

    showDetection() {
        // image(video, 0, 0);
        // console.log(1)
        stroke(0, 255, 0);
        strokeWeight(4);
        noFill();
        rect(this.x, this.y, this.width, this.height);
        noStroke();
        fill(255);
        textSize(24);
        text("explosion", this.x + 10, this.y + 24);
    }
}