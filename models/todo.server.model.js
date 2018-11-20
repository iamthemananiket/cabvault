import mongoose from 'mongoose';
var Schema = mongoose.Schema({
  name: String,
  pickUp: {
      type: Boolean,
      default: true
  },
  comments: {
    type: String,
    default: ''
}
});
export default mongoose.model('Todo', Schema);