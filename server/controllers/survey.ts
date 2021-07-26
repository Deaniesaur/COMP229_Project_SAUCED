import express, { Request, Response, NextFunction } from "express";
import Survey from "../models/survey";
import SurveyResponse from "../models/response";
import mongoose, { mongo } from "mongoose";

export function DisplayPublicSurveys(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let today = new Date().toISOString().slice(0, 10);

  let filter = {
    expiry: { $gte: today },
  };

  Survey.find(filter, function (err, surveys) {
    if (err) {
      return console.error(err);
    }

    res.render("index", {
      title: "SAUCED | Public Surveys",
      page: "surveys",
      surveys: surveys,
    });
  });
}

export function DisplayPrivateSurveys(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let today = new Date().toISOString().slice(0, 10);

  let filter = {
    //owner: "SampleUserName",
  };

  Survey.find(filter, function (err, surveys) {
    if (err) {
      return console.error(err);
    }

    res.render("index", {
      title: "SAUCED | Private Surveys",
      page: "surveys",
      surveys: surveys,
    });
  });
}

export function DisplayNewSurveyPage(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.render("index", {
    title: "SAUCED | New Survey",
    page: "newSurvey",
  });
}

export function DisplayUpdateSurveyPage(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let surveyId = req.params.id;
  let surveyFound: any;

  Survey.findOne({ _id: surveyId }, function (err: any, survey: any) {
    if (err) {
      return console.error(err);
    }

    surveyFound = survey.toObject();
    res.render("index", {
      title: "SAUCED | Edit Survey",
      page: "editSurvey",
      survey: surveyFound,
      sid: surveyId,
    });
  });
}

export function UpsertSurvey(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let surveyId = mongoose.Types.ObjectId(req.params.id);
  let today = new Date();
  let surveyThumbnail = null;
 
  //instantiate a Survey object
  let survey = new Survey({
    title: req.body.title,
    description: req.body.description,
    thumbnail: surveyThumbnail,
    owner: "User",
    questions: req.body.questions,
    created: today,
    updated: today,
    expiry: req.body.expiry,
    active: req.body.active,
    startDate: req.body.startDate

  });

  if (req.body.create == true) {
    Survey.create(survey, (err, survey) => {
      if (err) {
        console.error(err);
        res.end(err);
      }

      console.log("CREATED", survey._id);
    });
  } else {
    Survey.updateOne(
      { _id: surveyId },
      survey.toObject(),
      {},
      (err, survey) => {
        if (err) {
          console.error(err);
          res.end();
        }

        console.log("UPDATED", survey._id);
      }
    );
  }

  res.redirect("/");
}

export function DisplaySurveyById(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let surveyId = req.params.id;
  let surveyFound: any;

  Survey.findOne({ _id: surveyId }, function (err: any, survey: any) {
    if (err) {
      return console.error(err);
    }

    surveyFound = survey.toObject();
    res.render("index", {
      title: "SAUCED | Answer Survey",
      page: "respondSurvey",
      survey: surveyFound,
    });
  });
}

export function SubmitResponse(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let surveyId = req.params.id;
  let answers = [];
  let count = 0;

  // TODO: Insert Code to retrieve answers here as an Array
  while (true) {
    let value = req.body["question" + count];
    if (value == undefined) break;

    console.log(`Questions ${count}`, value);
    answers.push(value);
    count++;
  }

  let newResponse = new SurveyResponse({
    surveyId: surveyId,
    surveyOwner: "User",
    answers: answers,
    created: new Date(),
  });

  SurveyResponse.create(newResponse, (err, response) => {
    if (err) {
      console.error(err);
      res.end(err);
    }
  });

  res.redirect("/survey");
}

export function DeleteSurvey(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let id = req.params.id;

  Survey.deleteOne({ _id: id }, {}, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    }
  }).then(() => {
    SurveyResponse.deleteMany({ surveyId: id }, {}, (err) => {
      if (err) {
        res.end();
      }

      console.log(`Survey: ${id} DELETED`);
      res.redirect("/survey");
    });
  });
}
