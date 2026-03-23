import mongoose from "mongoose";

const BookmarkSchema = new mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId, ref : "User", required : true},
    idea : {type : mongoose.Schema.Types.ObjectId, ref : "Idea", required : true}
}, {timestamps : true});

BookmarkSchema.index({user : 1, idea : 1}, {unique : true});


const Bookmark = mongoose.model("Bookmark", BookmarkSchema);

export default Bookmark;