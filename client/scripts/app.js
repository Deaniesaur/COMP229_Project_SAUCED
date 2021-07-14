"use strict";

const questionTypeDiv = `
<div class="form-check form-check-inline">
  <input
    class="form-check-input"
    type="radio"
    name="inlineRadioOptions"
    id="inlineRadio1"
    value="option1"
  />
  <label class="form-check-label" for="inlineRadio1">
    MULTIPLE CHOICE
  </label>
</div>
<div class="form-check form-check-inline">
  <input
    class="form-check-input"
    type="radio"
    name="inlineRadioOptions"
    id="inlineRadio2"
    value="option2"
  />
  <label class="form-check-label" for="inlineRadio2">
    LONG ANSWER
  </label>
</div>
<div class="form-check form-check-inline">
  <input
    class="form-check-input"
    type="radio"
    name="inlineRadioOptions"
    id="inlineRadio3"
    value="option3"
  />
  <label class="form-check-label" for="inlineRadio3">
    CHECK BOXES
  </label>
</div>
<div class="form-check form-check-inline">
  <input
    class="form-check-input"
    type="radio"
    name="inlineRadioOptions"
    id="inlineRadio3"
    value="option3"
  />
  <label class="form-check-label" for="inlineRadio3">
    RATING
  </label>
</div>
<br />
<br />
<button type="button" class="btn btn-secondary" onclick="chooseNewQuestionType()">
  ADD
</button>
`;

const mainQuestionDiv = `<div class="text-center">
<p>QUESTION 1</p>
<textarea id="question" name="question" rows="2" cols="63">
WHAT DO YOU THINK ABOUT OUR WEBSITE?
                    </textarea
>
</div>`;

const newQuestionButton = `<a href="javascript:addNewQuestionType()">
<p class="text-center"><i class="fas fa-plus fa-2x"></i></p
></a>`;

const submitSurveyButton = `
          <button
            type="button"
            class="btn btn-secondary"
            onclick="submitSurveyQuestions()"
          >
            SUBMIT SURVEY
          </button>`;

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
  div.innerHTML = submitSurveyButton;
  document.getElementById("main-section").appendChild(div);
  $(div).hide().fadeIn(1000);
}

function addNewQuestionType() {
  console.log("Add new question.");
  let div = document.createElement("div");
  div.id = "question-type";
  div.innerHTML = questionTypeDiv;
  div.className = "text-center justify-content-center align-items-center";
  document.getElementById("main-section").appendChild(div);
  $(div).hide().fadeIn(1000);

  document.getElementById("btn-new-question").remove();
}

/* END OF THE ADD NEW QUESTION TYPE BUTTON */

function chooseNewQuestionType() {
  console.log("Choose new question.");
  let div = document.createElement("div");
  div.id = "question-main";
  div.innerHTML = mainQuestionDiv;
  document.getElementById("main-section").appendChild(div);
  $(div).hide().fadeIn(1000);
  displayQuestionOptions(1);
  document.getElementById("question-type").remove();
  addNewQuestionButton();
  //this is the first time user clicks add new question
  if (true) displaySubmitButton();
}

function displayQuestionOptions(i) {
  switch (i) {
    case 1:
      console.log("Option 1 is selected.");
  }
}
