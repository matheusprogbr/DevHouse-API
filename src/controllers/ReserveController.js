import Reserve from "../models/Reserve";
import House from "../models/House";
import User from "../models/User";

const ReserveController = {
  index: async (req,res) => {
    const { user_id } = req.headers;

    const reserves = await Reserve.find({user:user_id}).populate("house");

    return res.json(reserves);
    
  },
  store: async (req,res) => {
    const { date } = req.body;
    const { user_id } = req.headers;
    const { id } = req.params;

    const house = await House.findById(id);

    if(!house){
      return res.status(400).json({error: "Bad Request!"});
    }

    if(!house.status){
      return res.status(400).json({error: "This house is not available!"});
    }

    const user = await User.findById(user_id);

    if(String(user._id) === String(house.user)){
      return res.status(401).json({error: "You cannot book your own house!"});
    }

    const data = {
      date,
      user: user_id,
      house: id
    };

    const reserve = await Reserve.create(data);

    await reserve.populate("user").populate("house").execPopulate();

    return res.json(reserve);
  },

  delete: async (req,res) => {
    const { reserve_id } = req.body;
    const { user_id } = req.headers;

    const reserve = await Reserve.findOne({ _id:reserve_id });

    if(String(user_id) !== String(reserve.user)) return res.status(401).json({error: "You are not allowed to do this!"});

    await Reserve.findByIdAndDelete({ _id:reserve_id });

    return res.send();
    
  }
}

export default ReserveController;