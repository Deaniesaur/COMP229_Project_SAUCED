import exp from 'constants';
import express, {Request , Response, NextFunction} from 'express';

import Survey from '../models/survey';

export function DisplayAllSurveys(req: Request, res: Response, next: NextFunction): void{
    Survey.find(function(err, surveys){
        if(err){
            return console.error(err);
        }

        console.log(surveys);
        res.end();
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

export function UpdateSurvey(req: Request, res: Response, next: NextFunction): void{
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