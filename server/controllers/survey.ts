import express, { Request, Response, NextFunction } from "express";

import Survey from "../models/survey";

export function DisplayAllSurveys(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  Survey.find(function (err, surveys) {
    if (err) {
      return console.error(err);
    }

    console.log(surveys);
    res.end();
  });
}

export function CreateSurvey(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  //instantiate a new survey object
  let newSurvey = new Survey({
    title: "Test Title",
    owner: "Dean",
    created: new Date(),
    updated: new Date(),
  });

  Survey.create(newSurvey, (err, survey) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    console.log(survey._id);
    res.end();
  });
}

export function UpdateSurvey(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let id = req.params.id;

  //instantiate a new survey object
  let update = {
    title: req.body.title,
    updated: new Date(),
  };

  Survey.updateOne({ _id: id }, update, {}, (err, survey) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    console.log(survey._id);
    res.end();
  });
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

    console.log(`Survey: ${id} DELETED`);
    res.end();
  });
}
