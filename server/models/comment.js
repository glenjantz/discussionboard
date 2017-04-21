//require mongoose to set model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//make the schema
var CommentSchema = new mongoose.Schema({
_user: {type: Schema.Types.ObjectId,
        ref: "User",
        required: true},
_topic: {type: Schema.Types.ObjectId,
         ref: "Topic",
         required: true},
_post: {type: Schema.Types.ObjectId,
        ref: "Comment"},
comment: {type: String,
       required: [true, "Must have a post"]},
upvote: {type: Number, default: 0},
downvote: {type: Number, default: 0},
},{timestamps: true});
//set the schema
mongoose.model("Comment", CommentSchema);
