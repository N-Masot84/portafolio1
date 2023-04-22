import app from "./app.js";

export default {
    PORT: process.env.PORT || 5000,
    APPID: process.env.APPID || "",
};

// app.listen(app.get("port"));

// console.log("Server on port", app.get("port"));