import mongoose from "mongoose";


const RoadmapStepSchema = new mongoose.Schema({
    stepNumber : {type : Number, required : true},
    title : {type : String, required : true},
    description : {type : String, required : true},
    tips : [String]
}, {_id : true});


const IdeaSchema = new mongoose.Schema({
    title : {
        tpye : String, required : true, trim : true
    },
    slug : {type : String, required : true, unique : true, lowercase : true},
    category : {
        type : String,
        enum : ['crafts', 'food', 'digital', 'education', 'home', 'agriculture', 'other'],
        reqyuired  : true,
    },
    description : {type : String, required : true},
    emoji : {
        type : String, default : '💡'
    },
    skilltages : [{type : String, trim : true}],
    //cost range in local currency

    minCost : {type : Number, default : 0},
    maxCost : {type : Number, default : 0},
    currency : {type : String, default : '₹'},

    //embedded roadmap

    roadmapSteps : [RoadmapStepSchema],
    isActive : {type : Boolean, deafaul : true},
    createdBy : {type : mongoose.Schema.Types.ObjectId, ref : "User"}

}, {timestamps : true});

//text index for search

IdeaSchema.index({title : 'text', description : 'text', skillTags : 'text'});


const Idea = mongoose.model('Idea', IdeaSchema);

export default Idea;