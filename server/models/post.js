//require mongoose to set model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//make the schema
var PostSchema = new mongoose.Schema({
_user: {type: Schema.Types.ObjectId,
        ref: "User",
        required: true},
_topic: {type: Schema.Types.ObjectId,
         ref: "Topic",
         required: true},
post: {type: String,
       required: [true, "Must have a post"]},
comments: [{type: Schema.Types.ObjectId,
          ref: "Comment"}],
upvote: {type: Number, default: 0},
downvote: {type: Number, default: 0},
},{timestamps: true});
//set the schema
mongoose.model("Post", PostSchema);
