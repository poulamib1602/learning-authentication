const User = require("./module");
async function registerUser(req, res) {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(400).send("User already exists");
    }
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);
  }  

module.exports = registerUser;
