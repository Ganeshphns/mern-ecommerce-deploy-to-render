const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const shopPrdocutsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
mongoose
  .connect(
    "mongodb+srv://phnsganesh:phnsganesh2004@cluster0.ynto4.mongodb.net/"
  )
  .then(() => console.log("Mongodb connected"))
  .catch((error) => console.log(error));

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", shopPrdocutsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.listen(PORT, () => {
  console.log("server is running at port 5000");
});
