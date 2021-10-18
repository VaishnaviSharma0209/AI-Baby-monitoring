status="";
object=[];
function preload(){
    alarm=loadSound("alarm_classic.mp3");
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    image_detector=ml5.objectDetector("cocossd",model_loaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function draw(){
    image(video,0,0,380,380);

    if(status != ""){
        for(i=0;i<object.length;i++){
            r=random(255);
            b=random(255);
            g=random(255);
            image_detector.detect(video,gotresults);
            document.getElementById("status").innerHTML="Status: Object Detected";
            document.getElementById("number").innerHTML="Number of objects detected: "+ object.length;

            fill(r,g,b);
            percentage=floor(object[i].confidence*100);
            text(object[i].label + " " + percentage + "%", object[i].x+15, object[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

            if (object[i].label="person"){
                document.getElementById("baby").innerHTML="Baby Found";
            }
            else{
                document.getElementById("baby").innerHTML="Baby Not Found"; 
                alarm.play();
            }
        }
       
    }
}
function model_loaded(){
    console.log("Model Loaded");
    status=true;
}
function gotresults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object=results;
    }
}