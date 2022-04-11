Prediction_1 = "Happy is an example";
Prediction_2 = "Sad is an example";

Webcam.set({
    width :350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="photo_clicked" src="'+data_uri+'">';
    });
}


console.log('ml5 version:',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/CPAzPMhjD/model.json',modelLoaded);

function modelLoaded(){
    console.log('model loaded!');
}

function speak(){
var synth = window.speechSynthesis;
speak_data_1="The first prediction is "+Prediction_1;
speak_data_2="And the second prediction is "+Prediction_2;
var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
synth.speak(utterThis);
}

function Check(){
    img=document.getElementById('photo_clicked');
    classifier.classify(img,gotResults);
}

function gotResults(error,results){
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;

        Prediction_1=results[0].label;
        Prediction_2=results[1].label;
        speak();

        if (results[0].label=="amazing") {
            document.getElementById("update_emoji").innerHTML="👌";           
            }
            
            if (results[0].label=="victory") {
                document.getElementById("update_emoji").innerHTML="✌️";           
                }

                if (results[0].label=="thumbs up") {
                    document.getElementById("update_emoji").innerHTML="👍";           
                    }
   
                    if (results[1].label=="amazing") {
                        document.getElementById("update_emoji2").innerHTML="👌";           
                        }
                        
                        if (results[1].label=="victory") {
                            document.getElementById("update_emoji2").innerHTML="✌️";           
                            }
            
                            if (results[1].label=="thumbs up") {
                                document.getElementById("update_emoji2").innerHTML="👍";           
                                }
                }
}