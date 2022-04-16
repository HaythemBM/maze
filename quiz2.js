const start_btn2 = document.querySelector(".start_btn2 button");
const info_box2 = document.querySelector(".info_box2");
const quiz_box2 = document.querySelector(".quiz_box2");
const result_box2 = document.querySelector(".result_box2");
const option_list2 = document.querySelector(".option_list2");
const time_line2 = document.querySelector("header .time_line2");
const timeText2 = document.querySelector(".timer2 .time_left_txt2");
const timeCount2 = document.querySelector(".timer2 .timer_sec2");



// if continueQuiz button clicked
start_btn2.onclick = ()=>{
   // info_box.classList.remove("activeInfo"); //hide info box
    quiz_box2.classList.add("activeQuiz2"); //show quiz box
    showQuetions2(0); //calling showQestions function
    queCounter2(1); //passing 1 parameter to queCounter
    startTimer2(15); //calling startTimer function
    startTimerLine2(0); //calling startTimerLine function
}

let timeValue2 =  5;
let que_count2 = 0;
let que_numb2 = 1;
let userScore2 = 0;
let counter2;
let counterLine2;
let widthValue2 = 0;

//const restart_quiz = result_box.querySelector(".buttons .restart");
const resume2 = result_box2.querySelector(".buttons2 .quit2");

var clicked2 =false;

// if quitQuiz button clicked
 resume2.addEventListener('click',  ()  =>  {
    document.getElementById("popup2").style.display = 'none';
    document.getElementById("popup").style.display = 'none';
    clicked2=true;

});  


const next_btn2 = document.querySelector("footer .next_btn2");
const bottom_ques_counter2 = document.querySelector("footer .total_que2");

// if Next Que button clicked
next_btn2.onclick = ()=>{
    if(que_count2 < questions2.length - 1){ //if question count is less than total question length
        que_count2++; //increment the que_count value
        que_numb2++; //increment the que_numb value
        showQuetions2(que_count2); //calling showQestions function
        queCounter2(que_numb2); //passing que_numb value to queCounter
        clearInterval(counter2); //clear counter
        clearInterval(counterLine2); //clear counterLine
        startTimer2(timeValue2); //calling startTimer function
        startTimerLine2(widthValue2); //calling startTimerLine function
        timeText2.textContent = "Time Left"; //change the timeText to Time Left
        next_btn2.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter2); //clear counter
        clearInterval(counterLine2); //clear counterLine
        showResult2(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions2(index){
    const que_text2 = document.querySelector(".que_text2");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag2 = '<span>'+ questions2[index].numb2 + ". " + questions2[index].question2 +'</span>';
    let option_tag2 = '<div class="option2"><span>'+ questions2[index].options2[0] +'</span></div>'
    + '<div class="option2"><span>'+ questions2[index].options2[1] +'</span></div>'
    + '<div class="option2"><span>'+ questions2[index].options2[2] +'</span></div>';
  
    que_text2.innerHTML = que_tag2; //adding new span tag inside que_tag
    option_list2.innerHTML = option_tag2; //adding new div tag inside option_tag
    
    const option2 = option_list2.querySelectorAll(".option2");

    // set onclick attribute to all available options
    for(i=0; i < option2.length; i++){
        option2[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creating the new div tags which for icons
let tickIconTag2 = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag2 = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected2(answer){
    clearInterval(counter2); //clear counter
    clearInterval(counterLine2); //clear counterLine
    let userAns2 = answer.textContent; //getting user selected option
    let correcAns2 = questions2[que_count2].answer2; //getting correct answer from array
    const allOptions2 = option_list2.children.length;
    
    
    if(userAns2 == correcAns2){ //if user selected option is equal to array's correct answer
        userScore2 += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag2); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore2);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag2); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions2; i++){
            if(option_list2.children[i].textContent == correcAns2){ //if there is an option which is matched to an array answer 
                option_list2.children[i].setAttribute("class", "option2 correct"); //adding green color to matched option
                option_list2.children[i].insertAdjacentHTML("beforeend", tickIconTag2); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions2; i++){
        option_list2.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn2.classList.add("show"); //show the next button if user selected any option
}

function showResult2(){
  
    quiz_box2.classList.remove("activeQuiz2"); //hide quiz box
    result_box2.classList.add("activeResult2"); //show result box
    const scoreText2 = result_box2.querySelector(".score_text2");
    if (userScore2 > 2){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag2 = '<span>and congrats! , You got <p>'+ userScore2 +'</p> out of <p>'+ questions2.length +'</p></span>';
        scoreText2.innerHTML = scoreTag2;  //adding new span tag inside score_Text
    }
    else if(userScore2 > 1){ // if user scored more than 1
        let scoreTag2 = '<span>and nice , You got <p>'+ userScore2 +'</p> out of <p>'+ questions2.length +'</p><br>Now turn to the right</br></span>';
        scoreText2.innerHTML = scoreTag2;
    }
    else{ // if user scored less than 1
        let scoreTag2 = '<span>and sorry , You got only <p>'+ userScore2 +'</p> out of <p>'+ questions2.length +'</p></span>';
        scoreText2.innerHTML = scoreTag2;
    }
}

function startTimer2(time){
    counter2 = setInterval(timer2, 1000);
    function timer2(){
        timeCount2.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time <= 5){ //if timer is less than 9
            let addZero2 = timeCount2.textContent; 
            timeCount2.textContent = "0" + addZero2; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter2); //clear counter
            timeText2.textContent = "Time Off"; //change the time text to time off
            const allOptions2 = option_list2.children.length; //getting all option items
            let correcAns2 = questions2[que_count2].answer2; //getting correct answer from array
            for(i=0; i < allOptions2; i++){
                if(option_list2.children[i].textContent == correcAns2){ //if there is an option which is matched to an array answer
                    option_list2.children[i].setAttribute("class", "option2 correct"); //adding green color to matched option
                    option_list2.children[i].insertAdjacentHTML("beforeend", tickIconTag2); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions2; i++){
                option_list2.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn2.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLine2(time){
    counterLine2 = setInterval(timer2, 8);
    function timer2(){
        time += 1; //upgrading time value with 1
        time_line2.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 15){ //if time value is greater than 549
            clearInterval(counterLine2); //clear counterLine
        }
    }
}

function queCounter2(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag2 = '<span><p>'+ index +'</p> of <p>'+ questions2.length +'</p> Questions</span>';
    bottom_ques_counter2.innerHTML = totalQueCounTag2;  //adding new span tag inside bottom_ques_counter
} 
 