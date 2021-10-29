objects= []
video=""
status=""

function preload(){
    video = createVideo('video.mp4');
    video.hide();
}

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
}



function start(){

objectDetector = ml5.objectDetector('cocossd', modelLoaded);
 document.getElementById("status").innerHTML = "Status : Detecting Ojects";
}

function gotResult(error,result){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects= results;
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0); 
}

function draw(){
    image(video,0,0,480,380);

    if(status!="")
    {
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.lenght;i++){
            document.getElementById("status").innerHTML="Status: object Detected";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are: +Objects.length";
            fill("#blue")
            percent = floor(objects[i].confidence * 100);
            text(objects[i].lable+""+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("#red");
            rect(objects[i].x,objects[i].y,objects[i].width.objects[i].height);
        }
    }
}