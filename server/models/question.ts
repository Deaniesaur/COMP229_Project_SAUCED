import mongoose from 'mongoose';
import mongodb from 'mongodb';

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    surveyId: mongodb.ObjectId,
    question: String,
    type: String,
    choices: [],
    created: Date,
    updated: Date
},
{
    collection: 'questions'
});

QuestionSchema.index({ surveyId: 1});

const Model = mongoose.model('Question', QuestionSchema);

export default Model;