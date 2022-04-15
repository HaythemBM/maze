let progressbar=document.querySelector(".circular-progress");
let valuecontainer=document.querySelector(".value-container");
const next_btn = document.querySelector(".next_btn");
let progressvalue=0;
let progressendvalue=75;
let speed=10;
next_btn.addEventListener('click',() =>{
    window.location.href='../index.html';  //reload the current window

});

const newLocal = 20.6;
let progress = setInterval (() => {
progressvalue++;
valuecontainer.textContent= `${progressvalue}%`;
progressbar.style.background= `conic-gradient(
    #b8973d ${progressvalue * 3.6}deg,
    #fcf4de ${progressvalue * 3.6}deg
    )`;
if (progressvalue==progressendvalue) {
    clearInterval(progress);
}
}, speed);

next_btn.addEventListener('click',  ()  =>  {
    progressvalue=30;
    valuecontainer.textContent= `${progressvalue}%`;
    progressbar.style.background= `conic-gradient(
        #b8973d ${progressvalue * 3.6}deg,
        #fcf4de ${progressvalue * 3.6}deg
        )`;
   


});