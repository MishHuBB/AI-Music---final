peter_pan_song = "";
harry_potter_theme_song = "";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_name = "";

function setup() {
    canvas = createCanvas(600, 530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotposes);
}

function preload() {
    peter_pan_song = loadSound("music2.mp3");
    harry_potter_theme_song = loadSound("music.mp3");
}

function modelLoaded() {
    console.log("poseNet Is Initialized");
}

function draw() {
    image(video, 0, 0, 600, 530);

    fill("#00ff00");
    stroke("#ff0000");

    song_name = peter_pan_song.isPlaying();
    console.log(song_name);

    song_name = harry_potter_theme_song.isPlaying();
    console.log(song_name);


    if (scoreleftWrist > 0.2) {
        circle(leftWrist_x, leftWrist_y, 20);
        harry_potter_theme_song.stop();
        if (song_name == false) {
            peter_pan_song.play();
        } else {
            console.log("Song Name: Peter Pan Song");
            document.getElementById("song_id").innerHTML = "Song Name: Peter Pan Song";
        }
    }
    if (scorerightWrist > 0.2) {
        circle(rightWrist_x, rightWrist_y, 20);
        peter_pan_song.stop();
        if (song_name == false) {
            harry_potter_theme_song.play();
        } else {
            console.log("Song Name: Harry Potter Theme Song");
            document.getElementById("song_id").innerHTML = "Song Name: Harry Potter Theme Song";
        }
    }
}

function gotposes(results) {
    if (results.length > 0) {
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);


        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = " + leftWrist_x + " leftWrist_y = " + leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = " + rightWrist_x + " rightWrist_y = " + rightWrist_y);
    }
}