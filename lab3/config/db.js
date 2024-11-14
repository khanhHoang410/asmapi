const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const atlat =
  "mongodb+srv://lab3:7goG14RK3FN0gnBQ@monggodbslide2.jooka.mongodb.net/myDB";
// "mongodb+srv://lab3:G128JGsikLW7iO5F@monggodbslide2.jooka.mongodb.net/myDB?retryWrites=true&w=majority&appName=monggodbslide2";
const connect = async () => {
  try {
    await mongoose.connect(atlat, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect success");
  } catch (error) {
    console.log("Connect fail");
    console.log(error);
  }
};

module.exports = { connect };
