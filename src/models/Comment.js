const mongooose = require("mongoose");

const commentSchema = mongooose.Schema({
  commentDetail: {
    type: String,
  },
  userId: {
    type: mongooose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongooose.model("Comment", commentSchema);
