const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const cors = require("cors")
// const path = require("path");

const app = express();

//connect to db
mongoose.connect(process.env.DB_URL || "mongodb://localhost:27017/express-react-crud-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("we're connected!");
});


// app.set("views", path.join(__dirname, "views"));
// app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}
else {
    app.use(cors());
}

var indexRouter = require("./routes/index");
var studentRouter = require("./routes/student");

app.use("/api", indexRouter);
app.use("/api/students", studentRouter);

app.listen(process.env.PORT || 8080, () => {
    console.log("Server has started.");
})