Prediction1="";
Prediction2="";

Webcam.set({
   width: 350,
    height:300,
    image_format:'jpg',
    jpg_quality: 90
});

Camera=document.getElementById("camera");
Webcam.attach('#Camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="result_img" src="'+data_uri+'">';
    });
}

console.log ("ml5 version",ml5.version);

classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Xc--cGXwr/model.json',modelLoaded);

function modelLoaded(){
    console.log ("model loaded successfully");
}

function speak(){
    var synth= window.speechSynthesis;
     speakdata1="The first Prediction is"+prediction1;
     speakdata2="The second Prediction is"+prediction2;
     utterThis=new SpeechSynthesisUtterance(speakdata1+speakdata2);
     synth.speak(utterThis);
}

function check(){
    img=document.getElementById("result_img");
    classifier.classify(img ,got_result);
}

function got_result(error,results){
   if(error){
       console.log (error);
   }
   else{
       console.log (results);
      document.getElementById("result_emotion_name").innerHTML=results[0].label;
      document.getElementById("result_emotion_name2").innerHTML=results[1].label;
      Prediction1=results[0].label;
      Prediction2=results[1].label;
      speak();
      if(results[0].label=="happy"){
          document.getElementById("updated_emoji").innerHTML="&#128512;";
      }
      if(results[0].label=="sad"){
        document.getElementById("updated_emoji").innerHTML="&#128532;";
    }
    if(results[0].label=="angry"){
        document.getElementById("updated_emoji").innerHTML="&#128548;";
    }
    if(results[0].label=="crying"){
        document.getElementById("updated_emoji").innerHTML="&#128546;";
    }
    if(results[1].label=="sad"){
        document.getElementById("updated_emoji2").innerHTML="&#128532;";
    }
    if(results[1].label=="happy"){
        document.getElementById("updated_emoji2").innerHTML="&#128512;";
    }
    if(results[1].label=="angry"){
        document.getElementById("updated_emoji2").innerHTML="&#128548;";
    }
    if(results[1].label=="crying"){
        document.getElementById("updated_emoji2").innerHTML="&#128546;";
    }
   }
}