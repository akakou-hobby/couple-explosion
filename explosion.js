class Expolosion {
    constructor(index, x, y, width, height) {
        this.index = index
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.imageSize = width > height ? width : height
    }

    play() {
        IMAGE = loadImage('./assets/explosion.gif')
        IMAGE.resize(this.imageSize, this.imageSize);
        IMAGE.play()
        SOUND.play()
    }

    draw() {
        const x = this.x + (this.width - this.imageSize) / 2

        if (IMAGE.gifProperties && IMAGE.gifProperties.playing) {
            this.showDetection()
            image(IMAGE, x, this.y, this.imageSize, this.imageSize);
        }
    }

    showDetection() {
        image(video, 0, 0);
        console.log(1)
        stroke(0, 255, 0);
        strokeWeight(4);
        noFill();
        rect(this.x, this.y, this.width, this.height);
        noStroke();
        fill(255);
        textSize(24);
        text("person", this.x + 10, this.y + 24);
    }
}