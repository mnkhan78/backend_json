require("dotenv").config();

const express = require("express");
const userRoutes = require("./routes/user.route");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors")



const app = express();

app.use(cors());
app.use(express.json());

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Server is runnning 🚀");
});

app.listen(PORT, () => {
    console.log(`server is running on: ${PORT}`);
    
});