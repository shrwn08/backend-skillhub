import mongoose from "mongoose";

const stepProgressSchema = new mongoose.Schema({
    stepId : {type : mongoose.Schema.Types.ObjectId, required : true},
    stepNumber : {type : Number},
    completed : {type : Boolean, default : false},
    completedAt : {type : Date},
}, {_id : false});


const ProgressShcema = new mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId, ref : "User", required : true},
    idea : {
        type : mongoose.Schema.Types.ObjectId, ref : "Idea", required : true
    },
    steps : [stepProgressSchema],
    isCompleted : {type : Boolean, default: false},
    completedAt : {type : Date},
},{timestamps : true});


ProgressShcema.index({user: 1, idea : 1}, {unique : true});

const Progress = mongoose.model("Progress", ProgressShcema);

export default Progress;