import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
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
  "mongodb+srv://newp:newp@newspcluster.qorb0be.mongodb.net/newsp?retryWrites=true&w=majority",
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
app.post("/login", async (req, res) => {
  const { email, password } = await req.body;
  const user = await User.findOne({ email: email });
  // console.log(user);
  if (!user) {
    return res.send({ message: "User not registered" });
  }
  if (password === user.password) {
    res.send({ message: "Login Successfull", status: "ok", user: user });
  } else {
    res.send({ message: "Password didn't match" });
  }
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

  const url = `http://localhost:3001/reset_password/${user._id}/${token}`;
  const emailHtml = `<h2>Click to reset password : ${url}</h2>`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "thenewsportal2023@gmail.com",
      pass: "uzxjzmwhvbmjurio",
    },
  });

  const options = {
    from: "thenewsportal2023@gmail.com",
    to: email,
    subject: "Explore - Reset Password",
    html: emailHtml,
  };

  const emailSender = await transporter.sendMail(options);
  res.send({
    message: "Check your email",
    status: "ok",
    user: user,
    data: emailSender,
  });
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

const paymentDetailSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    paymentId: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    isPremium: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const PaymentDetail = mongoose.model("PaymentDetail", paymentDetailSchema);

app.post("/api/store-payment-details", async (req, res) => {
  console.log("Received payment details:", req.body);
  try {
    const { userId, paymentId, plan, date } = req.body;
    const pdfPath = `receipts/${paymentId}.pdf`; // Path where the PDF receipt will be saved

    // Format the date for display
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
    // Ensure the receipts directory exists
    const receiptsDir = path.join(__dirname, "receipts");
    if (!fs.existsSync(receiptsDir)) {
      fs.mkdirSync(receiptsDir);
    }

    // Generate PDF receipt
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.fontSize(24).text("Payment Receipt", 100, 80);
    doc.fontSize(16).moveDown().text(`Date: ${formattedDate}`, 100);
    doc.text(`Payment ID: ${paymentId}`, 100);
    doc.text(`Plan: ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`, 100);
    doc.text(`Amount: ${plan === "monthly" ? "₹20" : "₹100"}`, 100);
    doc.end();

    // Store payment details
    const paymentDetail = new PaymentDetail({
      userId,
      paymentId,
      plan,
      date,
      isPremium: true,
    });
    await paymentDetail.save();

    // Setup nodemailer transporter as provided
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: true, // Note: `secure` should be false for port 587, true for port 465
      auth: {
        user: "thenewsportal2023@gmail.com", // Your Gmail address
        pass: "uzxjzmwhvbmjurio", // Your Gmail password or App Password
      },
    });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { role: "premium" } },
      { new: true }
    );
    const userEmail = updatedUser.email;

   // Email content for payment receipt
   const mailOptions = {
    from: "it24img@gmail.com", // Sender address
    to: userEmail, // Recipient email from the updated user document
    subject: "Payment Receipt - Explore Premium Subscription",
    html: `<p>Hello Reader !!</p>
      <p>You are now an EXPLORE Premium user :)</p>
      <p>You can now use all our premium features.</p>
      <p>Please download your attached payment receipt.</p>`,
    attachments: [
      {
        filename: "PaymentReceipt.pdf",
        path: pdfPath,
        contentType: "application/pdf",
      },
    ],
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
      return res
        .status(500)
        .json({
          message: "Failed to send receipt email",
          error: err.toString(),
        });
    } else {
      console.log("Email sent: " + info.response);
      res.json({
        message:
          "Payment details stored, user updated to premium, and receipt sent successfully.",
      });
    }
  });
} catch (error) {
  console.error("Error:", error);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: error.toString() });
}
});


app.listen(3001, () => {
  console.log("BE started at port 3000");
});
