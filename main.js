img = '';
Status = '';
objects = [];
person = '';

function preload() {
    alarm = loadSound('alarm.mp3');
}

function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (Status != '') {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            fill('#FF0000');
            noStroke();
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + ' ' + percent + '%', objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('#FF0000')
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == 'Person') {
                person = 'person';
            }
        }
        if (objects.length == 0) {
            person = '';
        }
        if (person == 'person') {
            document.getElementById('status').innerHTML = 'Person Detected';
            alarm.stop();
        } else {
            document.getElementById('status').innerHTML = 'Person Not Detected';
            alarm.play();
        }
    }
}

function modelLoaded() {
    console.log('Model has loaded');
    Status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
    }
    
    objects = results;
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = 'Status: Detecting Objects';
}