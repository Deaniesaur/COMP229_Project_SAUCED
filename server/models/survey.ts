import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SurveySchema = new Schema({
    title: String,
    description: String,
    thumbnail: Buffer,
    owner: String,
    questions: [],
    created: Date,
    updated: Date,
    expiry: Date
},
{
    collection: 'surveys'
});

const Model = mongoose.model('Survey', SurveySchema);

export default Model;