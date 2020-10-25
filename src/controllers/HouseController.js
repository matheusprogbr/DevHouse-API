import House from "../models/House";

const HouseController = {
  store: async (req,res) => {
    const {filename} = req.file;
    const {description, price, location, status } = req.body;
    const { user_id } = req.headers;

    const data = {
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status
    };

    const home = await House.create(data);

    return res.json({"data": home}).status(201);
  }
}

export default HouseController;