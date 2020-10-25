import House from "../models/House";

const HouseController = {
  store: async (req,res) => {
    console.log(req.body);
    console.log(req.file);
    return res.json({"message": "OK"}).status(201);
  }
}

export default HouseController;