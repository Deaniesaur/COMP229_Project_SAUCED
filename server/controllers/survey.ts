import express, {Request , Response, NextFunction} from 'express';

import Survey from '../models/survey';
import Question from '../models/question';

export function DisplayAllSurveys(req: Request, res: Response, next: NextFunction): void{
    Survey.find(function(err, surveys){
        if(err){
            return console.error(err);
        }

        console.log(surveys);
        // res.render("index", {
        //     title: "Recent Surveys",
        //     page: "recent",
        //     Surveys: surveys      
        //   });
        // res.end();
        return surveys;
    })
}

export function CreateSurvey(req: Request, res: Response, next: NextFunction): void{
    let today = new Date();
    let expiryDate = new Date();
    expiryDate.setDate(today.getDate() + 2);
    let surveyThumbnail = null;

    //instantiate a new survey object
    let newSurvey = new Survey({
        title: req.body.title,
        description: req.body.description,
        thumbnail: surveyThumbnail,
        owner: "User",
        created: today,
        updated: today,
        expiry: expiryDate
    });

    Survey.create(newSurvey, (err, survey) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        console.log(survey._id);
        res.end();
    })
}

export function GetSurveyById(req: Request, res: Response, next: NextFunction): void{
    let surveyId = req.params.id;
    let surveyFound: any;

    Survey.findOne({_id: surveyId}, function(err: any, survey: any){
        if(err){
            return console.error(err);
        }

        surveyFound = survey.toObject();
    }).then(() => {
        Question.find({surveyId: surveyId}, function(err, questions){
            if(err){
                return console.error(err);
            }
            
            surveyFound.questions = questions;
            console.log('Survey', surveyFound);
            res.end();
        });
    })
}

export function UpdateSurveyById(req: Request, res: Response, next: NextFunction): void{
    let id = req.params.id;

    //instantiate a new survey object
    let update = {
        title: req.body.title,
        updated: new Date()
    }

    Survey.updateOne({_id: id}, update, {}, (err, survey) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        console.log(survey._id);
        res.end();
    })
}

export function DeleteSurvey(req: Request, res: Response, next: NextFunction): void{
    let id = req.params.id;

    Survey.deleteOne({_id: id}, {}, (err) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        console.log(`Survey: ${id} DELETED`);
        res.end();
    })
}