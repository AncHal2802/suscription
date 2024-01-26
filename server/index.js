import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
// import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// {
//   origin: ["https://explore-me.vercel.app"],
//   methods: ["POST", "GET"],
//   credentials: true,
// }

mongoose.connect(
  // process.env.MONGO_URL,
  "mongodb+srv://jaibn1234:jaibn1234@cluster0.uy9tkru.mongodb.net/portal2?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("\nDB connected");
  }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      unique: true,
      type: String,
      required: true,
    },
    email: {
      unique: true,
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

//Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successfull", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered", error: err });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, username, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already registerd" });
    } else {
      const user = new User({
        name,
        username,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send({ error: err });
        } else {
          res.send({ message: "Successfully Registered, Please login now." });
        }
      });
    }
  });
});

// const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/forgortpassword", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    console.error("Error finding user:");
    return res.status(404).json({ Status: "User not existed!" });
  }

  const token = jwt.sign({ id: user._id }, "jwt_secret_key", {
    expiresIn: "1d",
  });

  const url = `http://localhost:3000/reset_password/${user._id}/${token}`;
  const emailHtml = `<h2>Click to reset password : ${url}</h2>`;
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
      user: "it24img@gmail.com",
      pass: "fvfh msrl wuru ulkq",
    },
  });

  const options = {
    from: "it24img@gmail.com",
    to: email,
    subject: "Explore - Reset Password",
    html: emailHtml,
  };

  const emailSender = await transporter.sendMail(options);

  res.send({ message: "Check your email", user: user, data: emailSender });
});

app.post('/reset-password/:id/:token', async (req, res) => {
  const { id, token } = req.params
  const { password } = req.body

  jwt.verify(token, "jwt_secret_key", async (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }
    try {
      const userExists = await User.findOne({ _id: id })
      if (!userExists) {
        return res.send({ message: "Invalid token or ID" });
      }
      userExists.password = password;

      await userExists.save();
      res.send({ message: "Password Reset done" });
    } catch (error) {
      return res.send({ error: error });
    }

  })
})


app.listen(3001, () => {
  console.log("BE started at port 3001");
});
