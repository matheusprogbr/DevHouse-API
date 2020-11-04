import * as Yup from 'yup';
import User from '../models/User';

const SessionController = {
  store: async (req, res) => {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    const { email } = req.body;

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Login incorrect!' });

    const data = {
      email,
    };

    let user = await User.findOne({ email });

    if (user) {
      return res.json(user);
    }

    user = await User.create(data);

    return res
      .json({
        data: user,
      })
      .status(201);
  },
};

export default SessionController;
