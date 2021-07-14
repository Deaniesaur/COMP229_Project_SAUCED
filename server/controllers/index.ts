import express, { Request, Response, NextFunction } from "express";
import Survey from '../models/survey';

export function DisplayHomePage(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.render("index", {
    title: "SAUCED | Homepage",
    page: "home",
  });
}

export function DisplayAboutPage(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.render("index", {
    title: "SAUCED | About Us",
    page: "about",
  });
}

export function DisplaySurveyPage(

  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.render("index", {
    title: "SAUCED | New Survey",
    page: "newSurvey",
  });
}


export function DisplayRecentPage(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  Survey.find(function(err, surveys){
    if(err){
      return console.error(err);
    }

    console.log('Surveys', surveys);

    res.render("index", {
      title: "SAUCED | New Survey",
      page: "recent",
      surveys: surveys
    });
  })
}
