import mongoose from 'mongoose';
import mongodb from 'mongodb';

const Schema = mongoose.Schema;

const ResponseSchema = new Schema({
    surveyId: mongodb.ObjectId,
    surveyOwner: String,
    question: [],
    created: Date
},
{
    collection: 'responses'
});

ResponseSchema.index({ surveyId: 1, surveyOwner: 1 });

const Model = mongoose.model('Response', ResponseSchema);

export default Model;