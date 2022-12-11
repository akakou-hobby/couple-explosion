class Expolosion {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    load() {
        this.img = loadImage('./img/explosion.gif')
        this.img.play()
    }

    draw() {
        this.showDetection()

        if (this.img.gifProperties && this.img.gifProperties.playing) {
            image(this.img, this.x, this.y, this.w, this.h);
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