const start_btn3 = document.querySelector(".start_btn3 button");
const info_box3 = document.querySelector(".info_box3");
const quiz_box3 = document.querySelector(".quiz_box3");
const result_box3 = document.querySelector(".result_box3");
const option_list3 = document.querySelector(".option_list3");
const time_line3 = document.querySelector("header .time_line3");
const timeText3 = document.querySelector(".timer3 .time_left_txt3");
const timeCount3 = document.querySelector(".timer3 .timer_sec3");



// if continueQuiz button clicked
start_btn3.onclick = ()=>{
   // info_box.classList.remove("activeInfo"); //hide info box
    quiz_box3.classList.add("activeQuiz3"); //show quiz box
    showQuetions3(0); //calling showQestions function
    queCounter3(1); //passing 1 parameter to queCounter
    startTimer3(15); //calling startTimer function
    startTimerLine3(0); //calling startTimerLine function
}

let timeValue3 =  5;
let que_count3 = 0;
let que_numb3 = 1;
let userScore3 = 0;
let counter3;
let counterLine3;
let widthValue3 = 0;

//const restart_quiz = result_box.querySelector(".buttons .restart");
const resume3 = result_box3.querySelector(".buttons3 .quit3");

var clicked3 =false;

// if quitQuiz button clicked
 resume3.addEventListener('click',  ()  =>  {
    document.getElementById("popup3").style.display = 'none';
    document.getElementById("popup").style.display = 'none';
    clicked3=true;

});  


const next_btn3 = document.querySelector("footer .next_btn3");
const bottom_ques_counter3 = document.querySelector("footer .total_que3");

// if Next Que button clicked
next_btn3.onclick = ()=>{
    if(que_count3 < questions3.length - 1){ //if question count is less than total question length
        que_count3++; //increment the que_count value
        que_numb3++; //increment the que_numb value
        showQuetions3(que_count3); //calling showQestions function
        queCounter3(que_numb3); //passing que_numb value to queCounter
        clearInterval(counter3); //clear counter
        clearInterval(counterLine3); //clear counterLine
        startTimer3(timeValue3); //calling startTimer function
        startTimerLine3(widthValue3); //calling startTimerLine function
        timeText3.textContent = "Time Left"; //change the timeText to Time Left
        next_btn3.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter3); //clear counter
        clearInterval(counterLine3); //clear counterLine
        showResult3(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions3(index){
    const que_text3 = document.querySelector(".que_text3");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag3 = '<span>'+ questions3[index].numb3 + ". " + questions3[index].question3 +'</span>';
    let option_tag3 = '<div class="option3"><span>'+ questions3[index].options3[0] +'</span></div>'
    + '<div class="option3"><span>'+ questions3[index].options3[1] +'</span></div>'
    + '<div class="option3"><span>'+ questions3[index].options3[2] +'</span></div>';
  
    que_text3.innerHTML = que_tag3; //adding new span tag inside que_tag
    option_list3.innerHTML = option_tag3; //adding new div tag inside option_tag
    
    const option3 = option_list3.querySelectorAll(".option3");

    // set onclick attribute to all available options
    for(i=0; i < option3.length; i++){
        option3[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creating the new div tags which for icons
let tickIconTag3 = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag3 = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected3(answer){
    clearInterval(counter3); //clear counter
    clearInterval(counterLine3); //clear counterLine
    let userAns3 = answer.textContent; //getting user selected option
    let correcAns3 = questions3[que_count3].answer3; //getting correct answer from array
    const allOptions3 = option_list3.children.length;
    
    
    if(userAns3 == correcAns3){ //if user selected option is equal to array's correct answer
        userScore3 += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag3); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore3);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag3); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions3; i++){
            if(option_list3.children[i].textContent == correcAns3){ //if there is an option which is matched to an array answer 
                option_list3.children[i].setAttribute("class", "option3 correct"); //adding green color to matched option
                option_list3.children[i].insertAdjacentHTML("beforeend", tickIconTag3); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions3; i++){
        option_list3.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn3.classList.add("show"); //show the next button if user selected any option
}

function showResult3(){
  
    quiz_box3.classList.remove("activeQuiz3"); //hide quiz box
    result_box3.classList.add("activeResult3"); //show result box
    const scoreText3 = result_box3.querySelector(".score_text3");
    if (userScore3 > 2){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag3 = '<span>and congrats! , You got <p>'+ userScore3 +'</p> out of <p>'+ questions3.length +'</p></span>';
        scoreText3.innerHTML = scoreTag3;  //adding new span tag inside score_Text
    }
    else if(userScore3 > 1){ // if user scored more than 1
        let scoreTag3 = '<span>and nice , You got <p>'+ userScore3 +'</p> out of <p>'+ questions3.length +'</p><br>Now turn to the right</br></span>';
        scoreText3.innerHTML = scoreTag3;
    }
    else{ // if user scored less than 1
        let scoreTag3 = '<span>and sorry , You got only <p>'+ userScore3 +'</p> out of <p>'+ questions3.length +'</p></span>';
        scoreText3.innerHTML = scoreTag3;
    }
}

function startTimer3(time){
    counter3 = setInterval(timer3, 1000);
    function timer3(){
        timeCount3.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time <= 5){ //if timer is less than 9
            let addZero3 = timeCount3.textContent; 
            timeCount3.textContent = "0" + addZero3; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter3); //clear counter
            timeText3.textContent = "Time Off"; //change the time text to time off
            const allOptions3 = option_list3.children.length; //getting all option items
            let correcAns3 = questions3[que_count3].answer3; //getting correct answer from array
            for(i=0; i < allOptions3; i++){
                if(option_list3.children[i].textContent == correcAns3){ //if there is an option which is matched to an array answer
                    option_list3.children[i].setAttribute("class", "option3 correct"); //adding green color to matched option
                    option_list3.children[i].insertAdjacentHTML("beforeend", tickIconTag3); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions3; i++){
                option_list3.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn3.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLine3(time){
    counterLine3 = setInterval(timer3, 8);
    function timer3(){
        time += 1; //upgrading time value with 1
        time_line3.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 15){ //if time value is greater than 549
            clearInterval(counterLine3); //clear counterLine
        }
    }
}

function queCounter3(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag3 = '<span><p>'+ index +'</p> of <p>'+ questions3.length +'</p> Questions</span>';
    bottom_ques_counter3.innerHTML = totalQueCounTag3;  //adding new span tag inside bottom_ques_counter
} 
 