"use strict";
const header = document.querySelector(".important-survey-id");
const sid = header == null ? null : header.id;

//IIFE
(function () {
  let startDatePicker = document.getElementById("startDate");
  let expiryDatePicker = document.getElementById("expiry");

  if (sid == null) {
    let today = new Date();
    let tomorrow = new Date(today.getTime() + 86400000);
    startDatePicker.valueAsDate = today;
    expiryDatePicker.valueAsDate = tomorrow;
  }
})();

function getQuestionTypeDiv(questionNumber) {
  return `
<div class="form-check form-check-inline">
  <input
    class="form-check-input"
    type="radio"
    name="inlineRadioOptions"
    id="multipleChoice"
    value="1"
    checked=true
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
<br />
<br />
<button type="button" class="btn btn-secondary" onclick="chooseNewQuestionType(${questionNumber})">
  ADD
</button>
`;
}

function getQuestionBody(questionNumber) {
  return `
  <div class="text-center row" id="question-body">
  <div class="col-9">
  <p>QUESTION ${questionNumber + 1}</p>
  <textarea class="w-100" id="question-${
    questionNumber + 1
  }" name="question" rows="2" placeholder="Your question here."></textarea>
  </div>
  <div class="col-3">
  <a href="javascript:deleteQuestion(${questionNumber + 1})">
  <p class="text-center" id="trash-icon"><i class="fas fa-trash fa-4x"></i></p></a>
  </div>
  </div>`;
}

function getMultipleChoiceOption(questionNumber, optionNumber) {
  return `
<div class="row" id=option-${optionNumber}>
<div class="col-9">
<label class="form-check-label">
<input type="text" class="form-control" name="question-${questionNumber}" placeholder="Option ${optionNumber}">
</label>
</div>
<div class="col-3 option-icon">
<a href="javascript:deleteOption(${questionNumber}, ${optionNumber})">
<p class="text-center"><i class="fas fa-trash"></i></p></a></div></div>`;
}

function addNewQuestionButton(questionNumber, optionNumber) {
  if (document.querySelector(".important-survey-id") != null)
    questionNumber = document.getElementsByName("question").length;
  let div = document.createElement("div");
  div.id = "btn-new-question";
  div.innerHTML = `<a href="javascript:addNewQuestionType(${questionNumber})"><p class="text-center"><i class="fas fa-plus fa-2x"></i></p></a>`;
  document.getElementById("main-section").appendChild(div);
  $(div).hide().fadeIn(1000);
  if (document.querySelector(".important-survey-id") != null && optionNumber)
    displaySubmitButton();
}

addNewQuestionButton(0, true);

function displaySubmitButton() {
  let div = document.createElement("div");
  div.className = "text-center";
  div.id = "btn-submit-survey";
  div.innerHTML = `
  <br /><button type="button"class="btn btn-secondary button-red"onclick="submitSurveyQuestions()">SUBMIT SURVEY</button>`;
  document.getElementById("main-section").appendChild(div);
  $(div).hide().fadeIn(1000);
}

function addNewQuestionType(questionNumber) {
  if (questionNumber > 4) {
    window.alert("You can have a maximum of 5 questions in one survey.");
    return;
  }
  let div = document.createElement("div");
  div.id = "question-type";
  div.innerHTML = getQuestionTypeDiv(questionNumber);
  div.className = "text-center";
  document.getElementById("main-section").appendChild(div);
  $(div).hide().fadeIn(1000);
  if (questionNumber !== 0)
    document.getElementById("btn-submit-survey").remove();
  document.getElementById("btn-new-question").remove();
}

function chooseNewQuestionType(questionNumber) {
  let response;
  let options = document
    .querySelector("#question-type")
    .querySelectorAll(".form-check-input");
  for (
    let questionNumber = 0;
    questionNumber < options.length;
    questionNumber++
  ) {
    if (options[questionNumber].checked)
      response = parseInt(options[questionNumber].value);
  }

  let div = document.createElement("div");
  div.id = `question-main-${questionNumber}`;
  div.innerHTML = getQuestionBody(questionNumber);

  document.getElementById("main-section").appendChild(div);
  $(div).hide().fadeIn(1000);

  switch (response) {
    case 1:
      displayMultipleChoice(questionNumber + 1);
      break;
    case 2:
      displayShortAnswer(questionNumber + 1);
      break;
  }

  document.getElementById("question-type").remove();
  addNewQuestionButton(questionNumber + 1, false);
  displaySubmitButton();
}

function displayMultipleChoice(questionNumber) {
  let div = document.createElement("div");
  div.id = `answer-${questionNumber - 1}`;
  div.innerHTML =
    initMultipleChoiceOptions(questionNumber) +
    addNewOptionButton(questionNumber, 5);
  div.className = "text-center";
  document.getElementById("main-section").appendChild(div);
  $(div).hide().fadeIn(1000);
}

function displayShortAnswer(questionNumber) {
  let div = document.createElement("div");
  div.id = `answer-${questionNumber - 1}`;
  div.innerHTML = `<label class="form-check-label short-answer"></label><input class="form-control" type="text" placeholder="The participants will fill-in this area." disabled><br>`;
  div.className = "text-center";
  document.getElementById("main-section").appendChild(div);
  $(div).hide().fadeIn(1000);
}

function initMultipleChoiceOptions(questionNumber) {
  let optionsHtml = "";
  for (let optionNumber = 1; optionNumber < 5; optionNumber++) {
    optionsHtml += getMultipleChoiceOption(questionNumber, optionNumber);
  }
  return optionsHtml;
}

function addNewOptionButton(questionNumber, optionNumber) {
  return `
<div class="form-check form-check-inline" name="option-${optionNumber}">
<p class="text-center" id="edit-icon">
  <a href="javascript:addNewOption(${questionNumber}, ${optionNumber})">
<i class="fas fa-plus"></i></a></p
>
</div>`;
}

function addNewOption(questionNumber, optionNumber) {
  if (optionNumber > 5) {
    window.alert("You can't add more than 5 options in the current version.");
    return;
  }
  let div = document.getElementById(`answer-${questionNumber - 1}`);
  div.children[optionNumber - 1].remove();
  div.insertAdjacentHTML(
    "beforeend",
    getMultipleChoiceOption(questionNumber, optionNumber) +
      addNewOptionButton(questionNumber, optionNumber + 1)
  );
}

function deleteOption(questionNumber, optionNumber) {
  let div = document.getElementById(`answer-${questionNumber - 1}`);
  div.children[optionNumber - 1].remove();
  for (let i = optionNumber - 1; i < 10; i++) {
    let optionDiv = div.children[i];
    optionDiv.id = `option-${i + 1}`;
    let anchor = optionDiv.querySelector("a");
    if (div.children[i + 1] == undefined) {
      anchor.href = `javascript:addNewOption(${questionNumber}, ${i + 1})`;
      return;
    }
    anchor.href = `javascript:deleteOption(${questionNumber}, ${i + 1})`;
  }
}

function deleteQuestion(questionNumber) {
  let numberOfQuestions = document.getElementsByName("question").length;
  document.getElementById(
    "btn-new-question"
  ).firstChild.href = `javascript:addNewQuestionType(${numberOfQuestions - 1})`;

  questionNumber = parseInt(questionNumber);
  if (
    questionNumber == 1 &&
    document.getElementById(`question-main-${questionNumber}`) == undefined
  )
    $(`#btn-submit-survey`).fadeOut(1000, function () {
      $(this).remove();
    });
  $(`#question-main-${questionNumber - 1}`).fadeOut(1000, function () {
    $(this).remove();
  });
  $(`#answer-${questionNumber - 1}`).fadeOut(1000, function () {
    $(this).remove();
  });

  for (let i = numberOfQuestions - 1; i >= questionNumber; i--) {
    let parent = document.getElementById(`question-main-${i}`);
    parent.id = `question-main-${i - 1}`;
    parent.querySelector("p").textContent = `QUESTION ${i}`;
    parent.querySelector("a").href = `javascript:deleteQuestion(${i})`;

    parent = document.getElementById(`answer-${i}`);
    parent.id = `answer-${i - 1}`;

    for (let j = 0; j < 10; j++) {
      let optionDiv = parent.children[j];
      let anchor = optionDiv.querySelector("a");
      if (parent.children[j + 1] == undefined) {
        anchor.href = `javascript:addNewOption(${i}, ${j + 1})`;
        j = 10;
      }
      anchor.href = `javascript:deleteOption(${i}, ${j + 1})`;
    }
  }
}

function submitSurveyQuestions() {
  let url;
  sid != null ? (url = `/survey/edit/${sid}`) : (url = "/survey/create");
  let http = new XMLHttpRequest();
  let description = document.getElementById("description").value;
  let surveyQuestions = [];
  let questionsDiv = document.getElementsByName("question");

  questionsDiv.forEach((question) => {
    let surveyQuestion = {};
    surveyQuestion["question"] = question.value;
    surveyQuestion["choices"] = [];

    let options = document.getElementsByName(question.id);
    console.log(question.id)
    options.forEach((option) => {
      option.type != "textarea"
        ? surveyQuestion.choices.push(option.value)
        : true;
    });
    if (surveyQuestion.choices.length == 0) {
      surveyQuestion["type"] = "Short Answer";
    } else {
      surveyQuestion["type"] = "Multiple Choice";
    }
    surveyQuestions.push(surveyQuestion);
  });
  let select = document.getElementById("active");
  let isActive = select.options[select.selectedIndex].value;
  let payload = {
    title: document.getElementById("survey-title").value,
    description: description,
    questions: surveyQuestions,
    startDate: document.getElementById("startDate").value,
    expiry: document.getElementById("expiry").value,
    active: isActive,
  };
  sid != null ? (payload.create = false) : (payload.create = true);
  http.open("POST", url, true);
  http.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      window.location = http.responseURL + "survey/private";
    }
  };
  http.send(JSON.stringify(payload));
}
