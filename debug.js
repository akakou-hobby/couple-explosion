let poses = [];

function setPoses(p) {
    poses = p;
}

function drawPoseNet() {
    for (const pose of poses) {
        drawKeyPoint(pose);
        drawSkeleton(pose);
    }
}

function drawKeyPoint(pose) {
    for (let keypoint of pose.pose.keypoints) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
    }
}

function drawSkeleton(pose) {
    for (const skeleton of pose.skeleton) {
        let partA = skeleton[0];
        let partB = skeleton[1];

        stroke(255, 0, 0);
        line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
}
