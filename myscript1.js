let counter = 0;
let scrollCounter = 0;
let imgBox = document.getElementById("id-img-box");
let imgBoxParent = document.getElementById("id-img-box-parent");
let scrollIndicator = document.getElementById("id-scroll-thing");
let countLimit = 1010;
let scrollIndicatorWidth = 0;
let imgURL = "";
let imgCounter = 1;
let speedSlider = document.getElementById("id-speed-slider");
let imgCountLimit = 120;
let imgChangerId;
let scrollerImgsID;
let sliderValue = +speedSlider.value;
let speedValueText = document.getElementById("speed-text");
const totalFps = 3000;
speedSlider.value = 1;
speedValueText.innerHTML = sliderValue;
let lastImageAdded;
let imgBoxDivGenerated;
let startBtn = document.getElementById("start-btn");

let multiplier = 25;
let sliderValueSpeedRate = totalFps/(sliderValue*multiplier);

const warning = document.getElementById("id-warning");

window.onload = (event) => {
    console.log("page is fully loaded");
    warning.style.setProperty('width', window.innerWidth+'px');

    let modeRadio = document.getElementsByName('select-mode');
    for(i = 0; i < modeRadio.length; i++) {
        modeRadio[i].checked = false;
    }

    var catRadio = document.getElementsByName('select-category');
    for(i = 0; i < catRadio.length; i++) {
        catRadio[i].checked = false;
    }
};


speedSlider.oninput = function() {
    //console.log(speedSlider.value);
    sliderValue = +speedSlider.value;
    sliderValueSpeedRate = totalFps/(sliderValue*multiplier);
    speedValueText.innerHTML = sliderValue;
}

function imgFlasherFn(){

    let imgDir = "";
    let categoryElements = document.getElementsByName('select-category');
    for(i = 0; i < categoryElements.length; i++) {
        if(categoryElements[0].checked){
            imgDir = "./imgs-education-1/";
        }
        else if(categoryElements[1].checked){
            imgDir = "./imgs-health-1/";
        }
        else if(categoryElements[2].checked){
            imgDir = "./imgs-science-1/";
        }
    }    

    counter++;
    if(imgCounter <= imgCountLimit){
        //let sliderValue = +speedSlider.value;
        //console.log(sliderValue);
        //console.log(typeof(sliderValue));    
        //console.log(Math.floor(sliderValueSpeedRate));
        let sliderValueSpeedRateRounded = Math.floor(sliderValueSpeedRate);
        if(counter % sliderValueSpeedRateRounded == 0){
            //imgBox.style.setProperty('background-color', "#fefefe");
            imgURL = imgDir+imgCounter+".jpg";
            //console.log(imgURL);
            imgBox.setAttribute("src", imgURL);
            imgCounter++;
        }
        else{
            imgBox.style.setProperty('background-color', "#111111");
        }
        imgChangerId = window.requestAnimationFrame(imgFlasherFn);
    }
    else{
        console.log("stoppped!!!");
        startBtn.disabled = false;
        // imgBox.style.setProperty('background-color', "#111111");
        // cancelAnimationFrame(imgChangerId);
        // imgBox.style.setProperty('visibility', "hidden");
        // speedSlider.value = 1;
        // speedValueText.innerHTML = speedSlider.value;
        stopFn();
    }
    scrollIndicatorWidth = (imgCounter/imgCountLimit)*100;
    scrollIndicator.style.setProperty('width', scrollIndicatorWidth + "%");
}

function boomFn(){
    //console.log("HEJJJ");
    startBtn.disabled = true;
    var modeElements = document.getElementsByName('select-mode');
    let typeOfImageMode = "";
    for(i = 0; i < modeElements.length; i++) {
        if(modeElements[0].checked){
            //document.getElementById("result").innerHTML = "Gender: "+ele[i].value;
            typeOfImageMode = "imgFlasher";
        }
        if(modeElements[1].checked){
            typeOfImageMode = "imgScroller";
        }
    }

    var catElements = document.getElementsByName('select-category');
    let typeOfCategory = "";
    for(i = 0; i < catElements.length; i++) {
        if(catElements[0].checked){
            typeOfCategory = "education";
        }
        else if(catElements[1].checked){
            typeOfCategory = "health";
        }
        else if(catElements[2].checked){
            typeOfCategory = "science";
        }
    }

    for(i = 0; i < modeElements.length; i++) {
        modeElements[i].disabled = true;
    }
    for(i = 0; i < catElements.length; i++) {
        catElements[i].disabled = true;
    }


    if(typeOfImageMode == "imgFlasher"){
        imgCounter = 1;
        speedSlider.value = 1;
        sliderValue = +speedSlider.value;
        sliderValueSpeedRate = totalFps/(sliderValue*multiplier);
        imgBox.style.setProperty('visibility', "visible");
        imgBox.style.setProperty('display', "block");
        console.log("Flasher + " + typeOfCategory);
        //console.log(typeOfCategory);

        if(typeOfCategory !== ""){
            window.requestAnimationFrame(imgFlasherFn);
        }
        
    }

    if(typeOfImageMode == "imgScroller"){
        speedSlider.value = 1;
        //sliderValue = +speedSlider.value;
        //sliderValueSpeedRate = totalFps/(sliderValue*multiplier);
        imgBox.style.setProperty('visibility', "hidden");
        imgBoxDivGenerated = document.createElement("div");
        console.log("Scroller + " + typeOfCategory);
        if(typeOfCategory == "education"){
            imageScroller("education");
        }
        else if(typeOfCategory == "health"){
            imageScroller("health");
        }
        else if(typeOfCategory == "science"){
            imageScroller("science");
        }
        
    }
}

function stopFn(){
    startBtn.disabled = false;
    let modeElements = document.getElementsByName('select-mode');
    let catElements = document.getElementsByName('select-category');
    let typeOfImageMode = "";
    for(i = 0; i < modeElements.length; i++) {
        if(modeElements[0].checked){
            //document.getElementById("result").innerHTML = "Gender: "+ele[i].value;
            typeOfImageMode = "imgFlasher";
        }
        if(modeElements[1].checked){
            typeOfImageMode = "imgScroller";
        }
    }

    if(typeOfImageMode == "imgFlasher"){
        cancelAnimationFrame(imgChangerId);
        console.log("User Stopped Flashing...");
        //imgBox.style.setProperty('visibility', "hidden");
        imgBox.style.setProperty('display', "none");
        //imgBox.remove();
        imgCounter=1;
    }
    if(typeOfImageMode == "imgScroller"){
        console.log("User Stopped Scrollling...");
        cancelAnimationFrame(scrollerImgsID);
        //sliderValue = 1;
        //imgBoxDivGenerated.style.setProperty('visibility', "hidden");
        imgBoxDivGenerated.remove();
    }
    
    sliderValue = 1;
    speedSlider.value = 1;
    speedValueText.innerHTML = speedSlider.value;
    scrollIndicator.style.setProperty('width', "0%");

    for(i = 0; i < modeElements.length; i++) {
        modeElements[i].disabled = false;
    }
    for(i = 0; i < catElements.length; i++) {
        catElements[i].disabled = false;
    }

    imgBoxDivGenerated.remove();
}

function imageScroller(categoryRecv){
    let numImages = imgCountLimit;
    let imgDir = "";
    if(categoryRecv == "health"){
        //numImages = 10;
        imgDir = "./imgs-health-1/";
    }
    if(categoryRecv == "education"){
        imgDir = "./imgs-education-1/";
    }
    if(categoryRecv == "science"){
        imgDir = "./imgs-science-1/";
    }
    
    for(let i=1; i <= numImages; i++){
        let newImgHolder = document.createElement("img");
        let iURL = imgDir + i + ".jpg";
        newImgHolder.setAttribute("src", iURL);
        newImgHolder.className = "img-box-generated";
        if(i == numImages){
            newImgHolder.setAttribute("id", "lastOneStanding");
        }
        imgBoxDivGenerated.appendChild(newImgHolder);
    }

    imgBoxDivGenerated.className = "img-box-div-gen";
    imgBoxParent.appendChild(imgBoxDivGenerated);

    lastImageAdded = document.querySelector("#lastOneStanding");
    
    startTheScrolling();
}

function startTheScrolling(){
    // lastImageAdded.scrollIntoView({ 
    //     behavior: "smooth",
    //     block: "end"});

    // setInterval(() => {
    //     imgBoxDivGenerated.scrollBy({
    //         top: 10,
    //         left: 0,
    //         behavior: "smooth",
    //       });
    // }, 100);


    scrollCounter++;

    let scrollRateYMultiplier = 25;
    let scrollRateY = sliderValue * scrollRateYMultiplier;

    if(scrollCounter % 2 == 0){
        imgBoxDivGenerated.scrollBy({
                    top: scrollRateY,
                    left: 0,
                    behavior: "smooth",
                  });
    }
    
    scrollerImgsID = window.requestAnimationFrame(startTheScrolling);
}

function hideWarning(){
    
    warning.style.setProperty('visibility', "hidden");
}