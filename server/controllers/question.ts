import express, {Request , Response, NextFunction} from 'express';

import Question from '../models/question';

export function GetQuestionsBySurveyId(req: Request, res: Response, next: NextFunction): void{
    let surveyId = req.params.id;

    Question.find({surveyId: surveyId}, function(err: any, questions: any){
        if(err){
            return console.error(err);
        }

        console.log(questions);
        res.end();
    })
}

export function AddQuestionWithSurveyId(req: Request, res: Response, next: NextFunction): void{
    let surveyId = req.params.id;

    //instantiate a new survey object
    let newQuestion = new Question({
        surveyId: surveyId,
        question: req.body.question,
        type: req.body.type,
        choices: [],
        created: new Date(),
        updated: new Date()
    });

    Question.create(newQuestion, (err: any, question: any) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        console.log(question._id);
        res.end();
    })
}

export function UpdateQuestionWithId(req: Request, res: Response, next: NextFunction): void{
    let id = req.params.id;

    let update = {
        question: req.body.question,
        type: req.body.type,
        updated: new Date()
    };

    Question.updateOne({_id: id}, update, {}, (err: any, question: any) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        console.log(question._id);
        res.end();
    })
}

export function DeleteQuestionWithId(req: Request, res: Response, next: NextFunction): void{
    let id = req.params.id;

    Question.deleteOne({_id: id}, {}, (err: any) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        console.log(`Question: ${id} DELETED`);
        res.end();
    })
}