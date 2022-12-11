class Expolosion {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.imageSize = width > height ? width : height
    }

    load() {
        this.img = loadImage('./img/explosion.gif')

        this.img.resize(this.imageSize, this.imageSize);
        this.img.play()
    }

    draw() {
        this.showDetection()

        const x = this.x + (this.width - this.imageSize) / 2

        if (this.img.gifProperties && this.img.gifProperties.playing) {
            image(this.img, x, this.y, this.imageSize, this.imageSize);
        }
    }

    showDetection() {
        image(video, 0, 0);
        stroke(0, 255, 0);
        strokeWeight(4);
        noFill();
        rect(this.x, this.y, this.width, this.height);
        noStroke();
        fill(255);
        textSize(24);
        text("label", this.x + 10, this.y + 24);
    }
}