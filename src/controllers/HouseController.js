import House from "../models/House";

const HouseController = {

  index: async (req,res) => {
    const { status } = req.query;

    if(status){
      const index = await House.find({
        status: true
      });
      
      return res.json({
        "data":index,
        "filter": status
      }).status(200);
    }

    const index = await House.find();

    return res.json({
      "data":index,
      "filter":status
    }).status(200);

  },

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
  },

  update: async (req,res) => {
    const { id } = req.params;
    const { user_id } = req.headers;
    const { filename } = req.file;
    
    const data = {
      user_id,
      thumbnail:filename,
      ...req.body
    };

    const update = await House.updateOne({_id:id}, data);

    return res.send();
  }
}

export default HouseController;