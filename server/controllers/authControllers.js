const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  const { username, fullname, email, password, age , phoneNumber } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 6);

    // Create new user
    const user = new User({
      username,
      fullname,
      email,
      password: hashedPassword,
      age,
      phoneNumber
    });
    await user.save();

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

   
    return res.status(201).json({
      message: 'User registered successfully!',
      token,
      user: {
        id: user._id,
        username :username,
        fullname: user.fullname,
        email: user.email,
        age: user.age,
        phoneNumber: user.phoneNumber,
        
      },
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Server error' });
  }
};




const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Generate token
    const token = jwt.sign(
      { id: user._id},
      process.env.JWT_SECRET,
      { expiresIn: '14d' }
    );

    // Return the token and user details
    res.json({
      token,
      user: {
        id: user._id,
        username :username,
        fullname: user.fullname,
        email: user.email,
        age: user.age,
        phoneNumber: user.phoneNumber,
        
      },
    });
  } catch (error) {
    console.error("Login error: ", error);  // Log the error for debugging
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { register, login};