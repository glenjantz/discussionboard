//require mongoose to set model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//make the schema
var UserSchema = new mongoose.Schema({
  name: {type: String,
         required: [true, "must give a name"],
         unique: true},
  topics: [{type: Schema.Types.ObjectId,
           ref: "Topic"}],
  posts: [{type: Schema.Types.ObjectId,
           ref: "Post"}],
  comments: [{type: Schema.Types.ObjectId,
            ref: "Comment"}],
  topiccount: {type: Number, default: 0},
  postcount: {type: Number, default: 0},
  commentcount: {type: Number, default: 0},
},{timestamps: true});
//set the schema
mongoose.model("User", UserSchema);
