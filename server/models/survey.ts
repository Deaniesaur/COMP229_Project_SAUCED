import mongoose from 'mongoose';
import mongodb from 'mongodb';

const Schema = mongoose.Schema;

const SurveySchema = new Schema({
    title: String,
    owner: String,
    created: Date,
    updated: Date
},
{
    collection: 'surveys'
});

const Model = mongoose.model('Survey', SurveySchema);

export default Model;