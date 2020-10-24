import User from "../models/User";

const SessionController = {
  store: async (req,res) => {
    const { email } = req.body;

    const data = {
      email
    };

    let user = await User.findOne({email});

    if(user){
      return res.json(user);
    }

    user = await User.create(data);

    return res.json({
      "data":user
    }).status(201);
  },
};

export default SessionController;