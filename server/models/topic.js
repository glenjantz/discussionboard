//require mongoose to set model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//make the schema
var TopicSchema = new mongoose.Schema({
  topic: {type: String,
         required: [true, "must give a topic name"],
         },
  description: {type: String,
                required: [true, "must give a topic description"]},
  category: {type: String,
             required: [true, 'must give a category']},
  _user: {type: Schema.Types.ObjectId,
          ref: "User"},
  posts: [{type: Schema.Types.ObjectId,
           ref: "Post"}],
},{timestamps: true});
//set the schema
mongoose.model("Topic", TopicSchema);
