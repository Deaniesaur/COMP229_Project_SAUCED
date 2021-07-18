"use strict";

//IEFE
(function (){
  let expiryDatePicker = document.getElementById("expiry");

  if(expiryDatePicker !== null)
    expiryDatePicker.value = new Date().toISOString().slice(0, 10);
})();

function getQuestionTypeDiv(i) {
  return `
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
    disabled
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
    disabled
  />
  <label class="form-check-label" for="trueFalse">
    TRUE / FALSE
  </label>
</div>
<br />
<br />
<button type="button" class="btn btn-secondary" onclick="chooseNewQuestionType(${i})">
  ADD
</button>
`;
}

function getQuestionBody(i) {
  return `
  <div class="text-center row" id="question-body">
  <div class="col-9">
  <p>QUESTION ${i + 1}</p>
  <textarea id="question${i + 1}" name="question" rows="2" cols="63">
  WHAT DO YOU THINK ABOUT OUR WEBSITE?
                      </textarea
  >
  </div>
  <div class="col-3">
  <a href="javascript:deleteQuestion(${i})">
<p class="text-center" id="trash-icon"><i class="fas fa-trash fa-4x"></i></p
></a>
  
  </div>
  </div>`;
}

function getNewQuestionButton(i) {
  return `<a href="javascript:addNewQuestionType(${i})">
<p class="text-center"><i class="fas fa-plus fa-2x"></i></p
></a>`;
}

const submitSurveyButton = `
<br />
          <button
            type="button"
            class="btn btn-secondary"
            onclick="submitSurveyQuestions()"
          >
            SUBMIT SURVEY
          </button>`;

function getMultipleChoiceQuestion(i, j) {
  return `
<div class="form-check form-check-inline" id="option-${j}">
<label class="form-check-label">
<input type="text" class="form-control" id="question${j}" name="question${i}" placeholder="Option ${j}">
  <a href="javascript:editOption(${i - 1}, ${j})">
<p class="text-center" id="edit-icon"><i class="fas fa-edit"></i></p
></a>
<a href="javascript:deleteOption(${i - 1}, ${j})">
<p class="text-center" id="edit-icon"><i class="fas fa-trash"></i></p
></a>
</label><br>
</div>`;
}

function getMultipleChoiceOption(i, j) {
  return `
<label class="form-check-label">
<input type="text" class="form-control" id="question${i}" placeholder="Option ${j}" enabled>
 
  <a href="javascript:editOption(${i}, ${j})">
<p class="text-center" id="edit-icon"><i class="fas fa-edit"></i></p
></a>
<a href="javascript:deleteOption(${i}, ${j})">
<p class="text-center" id="edit-icon"><i class="fas fa-trash"></i></p
></a>
</label> <br>`;
}

const shortAnswerQuestion = `
<br />
<br />
<label class="form-check-label short-answer"></label>
<input class="form-control" type="text" placeholder="The participants will fill-in this area." disabled>
<br />
<br />`;

function addNewQuestionButton(i, j) {
  if (document.querySelector(".important-survey-id") != null)
    i = document.getElementsByName("question").length;
  let div = document.createElement("div");
  div.id = "btn-new-question";
  div.innerHTML = getNewQuestionButton(i);
  document.getElementById("main-section").appendChild(div);
  $(div).hide().fadeIn(1000);
  if (document.querySelector(".important-survey-id") != null && j)
    displaySubmitButton();
}

addNewQuestionButton(0, true);

function displaySubmitButton() {
  let div = document.createElement("div");
  div.className = "text-center";
  div.id = "btn-submit-survey";
  div.innerHTML = submitSurveyButton;
  document.getElementById("main-section").appendChild(div);
  $(div).hide().fadeIn(1000);
}

function addNewQuestionType(i) {
  if (i > 4) {
    window.alert(
      "You can have a maximum of 5 questions in the current version."
    );
    return;
  }
  let div = document.createElement("div");
  div.id = "question-type";
  div.innerHTML = getQuestionTypeDiv(i);
  div.className = "text-center";
  document.getElementById("main-section").appendChild(div);
  $(div).hide().fadeIn(1000);
  if (i !== 0) document.getElementById("btn-submit-survey").remove();
  document.getElementById("btn-new-question").remove();
}

/* END OF THE ADD NEW QUESTION TYPE BUTTON */

function chooseNewQuestionType(j) {
  let response;
  let options = document
    .querySelector("#question-type")
    .querySelectorAll(".form-check-input");
  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) response = parseInt(options[i].value);
  }

  if (response == undefined) {
    window.alert("Please choose a question type.");
    return;
  }

  let div = document.createElement("div");
  div.id = `question-main-${j}`;
  div.innerHTML = getQuestionBody(j);

  document.getElementById("main-section").appendChild(div);
  $(div).hide().fadeIn(1000);

  j++;
  displayQuestionOptions(response, j);

  document.getElementById("question-type").remove();
  addNewQuestionButton(j, false);
  displaySubmitButton();
}

function initMultipleChoiceOptions(j) {
  let optionsHtml = "";
  for (let i = 1; i < 5; i++) {
    optionsHtml += getMultipleChoiceQuestion(j, i);
  }
  return optionsHtml;
}

function addNewOptionButton(i, j) {
  return `
<div class="form-check form-check-inline" id="option-${j}" style="vertical-align:top">
<p class="text-center" id="edit-icon">
  <a href="javascript:addNewOption(${i - 1}, ${j})">
<i class="fas fa-plus"></i></a></p
>
</div>`;
}

function addNewOption(i, j) {
  if (j > 5) {
    window.alert("You can't add more than 5 options in the current version.");
    return;
  }
  let questionDiv = document.getElementById(`answer-${i}`);
  let option = questionDiv.children[j + 1];
  option.innerHTML = getMultipleChoiceOption(i, j);
  let div = document.createElement("div");
  div.className = "form-check form-check-inline";
  div.style = "vertical-align:top";
  div.id = `option-${j + 1}`;
  div.innerHTML = addNewOptionButton(i + 1, j + 1);
  questionDiv.appendChild(div);
}

function displayMultipleChoice(i) {
  let div = document.createElement("div");
  div.id = `answer-${i - 1}`;

  div.innerHTML =
    "<br><br>" +
    initMultipleChoiceOptions(i) +
    addNewOptionButton(i, 5) +
    "<br><br>";
  div.className = "text-center";
  document.getElementById("main-section").appendChild(div);
  $(div).hide().fadeIn(1000);
}

function displayShortAnswer(i) {
  let div = document.createElement("div");
  div.id = `answer-${i - 1}`;
  div.innerHTML = shortAnswerQuestion;
  div.className = "text-center";
  document.getElementById("main-section").appendChild(div);
  $(div).hide().fadeIn(1000);
}

function displayQuestionOptions(i, j) {
  switch (i) {
    case 1:
      displayMultipleChoice(j);
      break;
    case 2:
      displayShortAnswer(j);
      break;
    case 3:
      displayCheckBoxes(j);
      break;
    case 4:
      displayTrueFalse(j);
      break;
  }
}

function deleteQuestion(i) {
  let x = document.getElementsByName("question").length;
  document.getElementById(
    "btn-new-question"
  ).firstChild.href = `javascript:addNewQuestionType(${x - 1})`;
  i = parseInt(i);
  if (
    i == 0 &&
    document.getElementById(`question-main-${i + 1}`) == undefined
  ) {
    $(`#btn-submit-survey`).fadeOut(1000, function () {
      $(this).remove();
    });
  }
  $(`#question-main-${i}`).fadeOut(1000, function () {
    $(this).remove();
  });
  $(`#answer-${i}`).fadeOut(1000, function () {
    $(this).remove();
  });
  for (let j = i + 1; j < x; j++) {
    let parent = document.getElementById(`question-main-${j}`);
    parent.id = `question-main-${j - 1}`;
    parent.querySelector("p").textContent =
      parent.querySelector("p").textContent.substring(0, 9) + j;
    parent.querySelector("a").href = `javascript:deleteQuestion(${j - 1})`;
    parent = document.getElementById(`answer-${j}`);
    parent.id = `answer-${j - 1}`;
    [...parent.querySelectorAll(`#question${j + 1}`)].forEach((e) => {
      e.id = `question${j}`;
      e.parentElement.htmlFor = `question${j}`;
    });
    for (let k = 1; k < 10; k++) {
      let child = parent.querySelectorAll("div")[k - 1];
      if (child == undefined) break;
      let anchors = child.querySelectorAll("a");
      switch (anchors.length) {
        case 0:
          break;
        case 1:
          anchors[0].href = `javascript:addNewOption(${j - 1}, ${x - 1})`;
          break;
        case 2:
          anchors[0].href = `javascript:editOption(${j - 1}, ${x - 1})`;
          anchors[1].href = `javascript:deleteOption(${j - 1}, ${x - 1})`;
          break;
      }
    }
  }
}

function editOption(i, j) {
  window.alert(
    "Enhanced edit is not implemented yet. You can enter your option inside the text area for now."
  );
  return;
  let questionDiv = document.getElementById(`answer-${i}`);
  questionDiv = questionDiv.querySelectorAll("div")[j - 1];
  let optionText = questionDiv.querySelectorAll("p")[0];
  optionText.textContent = "Hello World";
}

function deleteOption(i, j) {
  let questionDiv = document.getElementById(`answer-${i}`);
  questionDiv.children[j + 1].remove();
  for (let k = j + 1; k < 10; k++) {
    let optionDiv = questionDiv.children[k];
    if (optionDiv == undefined) break;
    optionDiv.id = `option-${k}`;
    let anchors = optionDiv.querySelectorAll("a");
    switch (anchors.length) {
      case 0:
        break;
      case 1:
        anchors[0].href = `javascript:addNewOption(${i}, ${k - 1})`;
        console.log("k", k);
        break;
      case 2:
        anchors[0].href = `javascript:editOption(${i}, ${k - 1})`;
        anchors[1].href = `javascript:deleteOption(${i}, ${k - 1})`;
        break;
    }
  }
}

function receiveSurveyId() {
  return document.querySelector(".important-survey-id").id;
}

function updateSurveyQuestions(id) {
  let http = new XMLHttpRequest();
  let url = `/survey/edit/${id}`;
  let description = document.getElementById("description").value;
  let surveyQuestions = [];
  let questionsDiv = document.getElementsByName("question");

  questionsDiv.forEach((question) => {
    let surveyQuestion = {};
    surveyQuestion["question"] = question.value;
    // surveyQuestion["type"] = "Multiple Choice";
    surveyQuestion["choices"] = [];

    let optionsDiv = document.getElementsByName(question.id);

    optionsDiv.forEach((option) => {
      surveyQuestion.choices.push(option.value);
    });
    if (surveyQuestion.choices.length == 0) {
      surveyQuestion["type"] = "Short Answer";
    } else {
      surveyQuestion["type"] = "Multiple Choice";
    }

    surveyQuestions.push(surveyQuestion);
  });

  let payload = {
    title: document.getElementById("survey-title").value,
    description: description,
    expiry: document.getElementById("expiry").value,
    questions: surveyQuestions,
  };

  http.open("POST", url, true);

  // http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http.setRequestHeader("Content-type", "application/json;charset=UTF-8");

  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      window.location = http.responseURL + "survey";
    }
  };
  // http.send(params);
  http.send(JSON.stringify(payload));
}

function submitSurveyQuestions() {
  if (document.querySelector(".important-survey-id") != null) {
    updateSurveyQuestions(document.querySelector(".important-survey-id").id);
    return;
  }

  let http = new XMLHttpRequest();
  let url = "/survey/create";
  let description = document.getElementById("description").value;
  let surveyQuestions = [];
  let questionsDiv = document.getElementsByName("question");

  questionsDiv.forEach((question) => {
    let surveyQuestion = {};
    surveyQuestion["question"] = question.value;
    // surveyQuestion["type"] = "Multiple Choice";
    surveyQuestion["choices"] = [];

    let optionsDiv = document.getElementsByName(question.id);

    optionsDiv.forEach((option) => {
      surveyQuestion.choices.push(option.value);
    });
    if (surveyQuestion.choices.length == 0) {
      surveyQuestion["type"] = "Short Answer";
    } else {
      surveyQuestion["type"] = "Multiple Choice";
    }

    surveyQuestions.push(surveyQuestion);
  });

  let payload = {
    title: document.getElementById("survey-title").value,
    description: description,
    expiry: document.getElementById("expiry").value,
    questions: surveyQuestions,
    create: true,
  };

  http.open("POST", url, true);

  // http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http.setRequestHeader("Content-type", "application/json;charset=UTF-8");

  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      window.location = http.responseURL + "survey";
    }
  };
  // http.send(params);
  http.send(JSON.stringify(payload));
}
