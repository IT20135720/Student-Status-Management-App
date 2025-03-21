const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const authRoutes = require("./routes/auth_routes");
const studentRoutes = require("./routes/student_routes");




dotenv.config();
require("./config/passport");


const app = express();


app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000","http://localhost:3001","http://localhost:3002","http://localhost:3003"],  
  methods: ["GET", "POST", "PUT", "DELETE"],  // Specify allowed methods
  credentials: true,  // Enable credentials (cookies, authorization headers, etc.)
}));

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});



app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',  // Secure cookies in production
    httpOnly: true,  // Prevents JavaScript access
    maxAge: 24 * 60 * 60 * 1000  // 1 day expiration
  }
}));

app.use(passport.initialize());
app.use(passport.session());



app.use("/auth",authRoutes);
app.use("/api/students",studentRoutes);



mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser : true,
    useUnifiedTopology: true,

}).then(()=> console.log("MongoDB Connected"))
  .catch((error) => console.log(error));

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
