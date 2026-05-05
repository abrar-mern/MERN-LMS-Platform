const express = require("express");
const app = express();
const userRoutes = require("./routes/User");
const CourseRoutes = require("./routes/Course");
const ProfileRoutes = require("./routes/Profile");
const RazorpayRoutes = require("./routes/Razorpay");

// Database Connection

const connectDB = require("./config/database");
connectDB();

const cookieParser = require("cookie-parser");

// CORS
const cors = require("cors");

const { cloudinaryConnect } = require("./config/cloudinary");
cloudinaryConnect();

const fileUpload = require("express-fileupload");

const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
    withCredentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/profile", ProfileRoutes);
app.use("/api/v1/course", CourseRoutes);
app.use("/api/v1/razorpay", RazorpayRoutes);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your Server is Up and Running",
  });
});

// Activate the server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
