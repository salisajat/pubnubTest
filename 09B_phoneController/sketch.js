/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * remote controller that sends a variable to all the listening devices
 * phone only
 */

// server variables

var dataServer;
var pubKey = 'pub-c-04865ac3-c615-4d71-950a-610c7abc805a';
var subKey = 'sub-c-35fc5cb0-1363-11e9-a898-9ef472141036';



//input variables

var nextButton;
var slideNumber=0;
var totalImages = 2;


//name used to sort your messages. used like a radio station. can be called anything
var channelName = "powerpoint";

function setup() 
{
  getAudioContext().resume();
  createCanvas(windowWidth, windowHeight);
  background(255);
  
  setShakeThreshold(20);  //sets the sensitivity of the deviceShaken function

   // initialize pubnub
  dataServer = new PubNub(
  {
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,  
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });
  
    background(255);
    noStroke();
    fill(0);  
    textSize(90);
    text("!!!SHAKE!!!", width/2, height/2);
}

function draw() 
{


}


///uses built in deviceShaken function in p5
function touchStarted() 
{

slideNumber = ((slideNumber+1)<=(totalImages-1)) ? slideNumber+=1 : 0; //shorthand for conditional assignment


//console.log(slideNumber);

  //publish the number to everyone.
  dataServer.publish(
    {
      channel: channelName,
      message: 
      {
        slide: slideNumber       
      }
    });

}


