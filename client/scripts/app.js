"use strict";

let counter = 0;

const questionTypeDiv = `
<div class="form-check form-check-inline">
  <input
    class="form-check-input"
    type="radio"
    name="inlineRadioOptions"
    id="multipleChoice"
    value="1"
  />
  <label class="form-check-label" for="multipleChoice">
    MULTIPLE CHOICE
  </label>
</div>
<div class="form-check form-check-inline">
  <input
    class="form-check-input"
    type="radio"
    name="inlineRadioOptions"
    id="shortAnswer"
    value="2"
  />
  <label class="form-check-label" for="shortAnswer">
    SHORT ANSWER
  </label>
</div>
<div class="form-check form-check-inline">
  <input
    class="form-check-input"
    type="radio"
    name="inlineRadioOptions"
    id="checkBoxes"
    value="3"
  />
  <label class="form-check-label" for="checkBoxes">
    CHECK BOXES
  </label>
</div>
<div class="form-check form-check-inline">
  <input
    class="form-check-input"
    type="radio"
    name="inlineRadioOptions"
    id="trueFalse"
    value="4"
  />
  <label class="form-check-label" for="trueFalse">
    TRUE / FALSE
  </label>
</div>
<br />
<br />
<button type="button" class="btn btn-secondary" onclick="chooseNewQuestionType()">
  ADD
</button>
`;

function getQuestionBody() {
  return `
  <div class="text-center row" id="question-body">
  <div class="col-9">
  <p>QUESTION ${counter + 1}</p>
  <textarea id="question" name="question" rows="2" cols="63">
  WHAT DO YOU THINK ABOUT OUR WEBSITE?
                      </textarea
  >
  </div>
  <div class="col-3">
  <a href="javascript:deleteQuestion(${counter})">
<p class="text-center" id="trash-icon"><i class="fas fa-trash fa-4x"></i></p
></a>
  
  </div>
  </div>`;
}

const newQuestionButton = `<a href="javascript:addNewQuestionType()">
<p class="text-center"><i class="fas fa-plus fa-2x"></i></p
></a>`;

const submitSurveyButton = `
<br />
          <button
            type="button"
            class="btn btn-secondary"
            onclick="submitSurveyQuestions()"
          >
            SUBMIT SURVEY
          </button>`;

function getMultipleChoiceQuestion() {
  return `
<br />
<br />
<div class="form-check form-check-inline">
<input
  class="form-check-input"
  type="radio"
  name="inlineRadioOptions"
  id="question${counter + 1}"
  value="1"
/>
<label class="form-check-label" for="question${counter + 1}">
  Option 1
</label>
</div>
<div class="form-check form-check-inline">
<input
  class="form-check-input"
  type="radio"
  name="inlineRadioOptions"
  id="question${counter + 1}"
  value="2"
/>
<label class="form-check-label" for="question${counter + 1}">
Option 2
</label>
</div>
<div class="form-check form-check-inline">
<input
  class="form-check-input"
  type="radio"
  name="inlineRadioOptions"
  id="question${counter + 1}"
  value="3"
/>
<label class="form-check-label" for="question${counter + 1}">
Option 3
</label>
</div>
<div class="form-check form-check-inline">
<input
  class="form-check-input"
  type="radio"
  name="inlineRadioOptions"
  id="question${counter + 1}"
  value="4"
/>
<label class="form-check-label" for="question${counter + 1}">
Option 4
</label>
</div>
<br />
<br />`;
}

const shortAnswerQuestion = `
<br />
<br />
<input class="form-control" type="text" placeholder="The participants will fill-in this area." disabled>
<br />
<br />`;

function addNewQuestionButton() {
  let div = document.createElement("div");
  div.id = "btn-new-question";
  div.innerHTML = newQuestionButton;
  document.getElementById("main-section").appendChild(div);
  $(div).hide().fadeIn(1000);
}

addNewQuestionButton();

function displaySubmitButton() {
  let div = document.createElement("div");
  div.className = "text-center";
  div.id = "btn-submit-survey";
  div.innerHTML = submitSurveyButton;
  document.getElementById("main-section").appendChild(div);
  $(div).hide().fadeIn(1000);
}

function addNewQuestionType() {
  if (counter > 4) {
    window.alert(
      "You can have a maximum of 5 questions in the current version."
    );
    return;
  }
  console.log("Add new question.");
  let div = document.createElement("div");
  div.id = "question-type";
  div.innerHTML = questionTypeDiv;
  div.className = "text-center";
  document.getElementById("main-section").appendChild(div);
  $(div).hide().fadeIn(1000);
  if (counter !== 0) document.getElementById("btn-submit-survey").remove();
  document.getElementById("btn-new-question").remove();
}

/* END OF THE ADD NEW QUESTION TYPE BUTTON */

function chooseNewQuestionType() {
  console.log("Choose new question.");
  let div = document.createElement("div");
  div.id = `question-main-${counter}`;
  div.innerHTML = getQuestionBody();

  document.getElementById("main-section").appendChild(div);
  $(div).hide().fadeIn(1000);

  let response;
  let isChecked = false;
  let options = document
      .querySelector("#question-type")
      .querySelectorAll(".form-check-input"),
    i;
  for (i = 0; i < options.length; i++) {
    console.log(options[i].value);
    if (options[i].checked) displayQuestionOptions(parseInt(options[i].value));
  }

  document.getElementById("question-type").remove();
  addNewQuestionButton();
  displaySubmitButton();
  counter++;
}

function displayMultipleChoice() {
  console.log("Add multiple choice question.");
  let div = document.createElement("div");
  div.id = `answer-${counter}`;
  div.innerHTML = getMultipleChoiceQuestion();
  div.className = "text-center";
  document.getElementById("main-section").appendChild(div);
  $(div).hide().fadeIn(1000);
}

function displayShortAnswer() {
  console.log("Add short answer question.");
  let div = document.createElement("div");
  div.id = `answer-${counter}`;
  div.innerHTML = shortAnswerQuestion;
  div.className = "text-center";
  document.getElementById("main-section").appendChild(div);
  $(div).hide().fadeIn(1000);
}

function displayQuestionOptions(i) {
  switch (i) {
    case 1:
      console.log("Option 1 is selected.");
      displayMultipleChoice();
      break;
    case 2:
      console.log("Option 2 is selected.");
      displayShortAnswer();
      break;
    case 3:
      console.log("Option 3 is selected.");
      displayCheckBoxes();
      break;
    case 4:
      console.log("Option 4 is selected");
      displayTrueFalse();
      break;
  }
}

function deleteQuestion(i) {
  i = parseInt(i);
  $(`#question-main-${i}`).fadeOut(1000, function () {
    $(this).remove();
  });
  $(`#answer-${i}`).fadeOut(1000, function () {
    $(this).remove();
  });
  for (let j = i + 1; j < counter; j++) {
    console.log(j);
    let parent = document.getElementById(`question-main-${j}`);
    console.log(parent);
    parent.id = `question-main-${j - 1}`;
    parent.querySelector("p").textContent =
      parent.querySelector("p").textContent.substring(0, 9) + j;
    parent.querySelector("a").href = `javascript:deleteQuestion(${j - 1})`;
    parent = document.getElementById(`answer-${j}`);
    parent.id = `answer-${j - 1}`;
    [...parent.querySelectorAll(`#question${j + 1}`)].forEach((e) => {
      e.id = `question${j}`;
      e.parentElement.querySelector("label").htmlFor = `question${j}`;
    });
  }
  counter--;
}

// function submitSurveyQuestions() {
//   let http = new XMLHttpRequest();
//   let url = "/home";
//   let params = "orem=ipsum&name=binny";
//   http.open("POST", url, true);

//   http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

//   http.onreadystatechange = function () {
//     if (http.readyState == 4 && http.status == 200) {
//       alert(http.responseText);
//     }
//   };
//   http.send(params);
// }

function submitSurveyQuestions() {
  console.log("Hello");
}

// Testing Axios Calls
async function testAxios(){
  let baseUrl = window.location.origin;
  console.log(baseUrl)

  console.log('Test Axios');

  let payload = {
    title: 'Axios Test',
    description: 'description'
  }

  axios.defaults.headers.post['Content-Type'] ='application/json';
  
  let res = await axios.post(baseUrl + '/survey/create', payload);
  let data = res.data;
  console.log(data);
}