import House from "../models/House";
import User from "../models/User";

import * as Yup from "yup";

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
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      price: Yup.number().required(),
      location: Yup.string().required(),
      status: Yup.boolean().required()
    })

    const {filename} = req.file;
    const {description, price, location, status } = req.body;
    const { user_id } = req.headers;

    if(!(await schema.isValid(req.body))) return res.status(400).json({error: "Validation Fail!"});

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
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      price: Yup.number().required(),
      location: Yup.string().required(),
      status: Yup.boolean().required()
    })

    const { id } = req.params;
    const { user_id } = req.headers;
    const { filename } = req.file;

    const user = await User.findById(user_id);
    const houses = await House.findById(id);

    if(!(await schema.isValid(req.body))) return res.status(400).json({error: "Validation Fail!"});

    if(String(user._id) !== String(houses.user)) return res.status(401).json({ error: "Not allowed to acess this route!"});
    
    const data = {
      user_id,
      thumbnail:filename,
      ...req.body
    };

    const update = await House.updateOne({_id:id}, data);

    return res.send();
  },

  delete: async (req,res) => {
    const { id } = req.params;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);
    const house = await House.findById(id);

    if(String(user._id) !== String(house.user)) return res.status(401).json({ error: "It is not allowed to delete a document!"});

    await House.deleteOne({_id:id});

    return res.send();
  }
}

export default HouseController;