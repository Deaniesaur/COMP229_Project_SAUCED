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
    expiry: Date,
    active: Boolean,
    startDate: Date
},
{
    collection: 'surveys',
    toObject: {
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.created;
        }
    },
});

const Model = mongoose.model('Survey', SurveySchema);

export default Model;