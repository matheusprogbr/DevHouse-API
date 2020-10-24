import mongoose from "mongoose";

const init = async () => {
await mongoose.connect("mongodb+srv://devhouse:devhouse@devhouse.9mxnd.mongodb.net/devhouse?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
}

init();