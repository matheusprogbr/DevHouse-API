import House from "../models/House";

const DashboardController = {
  show: async (req,res) =>{
    const { user_id } = req.headers;

    const houses = await House.find({user:user_id});

    return res.json({data:houses});
  }
}

export default DashboardController;