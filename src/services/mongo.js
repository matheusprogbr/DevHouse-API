import mongoose from 'mongoose';

const init = async () => {
  await mongoose.connect(
    'mongodb+srv://devhouse:devhouse@devhouse.9mxnd.mongodb.net/test?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

export default init;
