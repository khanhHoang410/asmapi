var express = require("express");
var router = express.Router();

// thêm model

const Distributors = require("../models/distributors");
const Fruits = require("../models/fruits");
// api thêm distributor
router.post("/add-distributor", async (req, res) => {
  try {
    const data = req.body; // lấy dữ liệu từ body
    const newDistributors = new Distributors({
      name: data.name,
    });
    const result = await newDistributors.save(); // thêm vào database
    if (result) {
      // nếu thêm thành công result !null trả về dữ liệu
      res.json({
        status: 200,
        messenger: "Thêm thành công",
        data: result,
      });
    } else {
      // nếu thêm khong thành công result null, thông báo khong thành công
      res.json({
        status: 400,
        messenger: "Lỗi không thêm thành công",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
});
// api thêm fruit
router.post("/add-fruit", async (rec, res) => {
  try {
    const data = rec.body; // lấy dữ liệu từ body
    const newfruit = new Fruits({
      name: data.name,
      quantity: data.quantity,
      price: data.price,
      status: data.status,
      image: data.image,
      description: data.description,
      id_distributor: data.id_distributor,
    });
    const result = await newfruit.save(); // thêm  vào database
    if (result) {
      // nếu thêm thành công result !null trả về dữ liệu
      res.json({
        status: 200,
        messenger: "thêm thành công",
        data: result,
      });
    } else {
      // nếu thêm không thành công result null , thông báo khhoogn thành công
      res.json({
        status: 400,
        messenger: "thêm thành công",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// get danh sách fruits
router.get("/get-list-fruit", async (req, res) => {
  try {
    const data = await Fruits.find().populate("id_distributor");
    res.json({
      status: 200,
      messenger: "Danh sách fruit",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
});
// get chi tiết fruits (truyền param id)
router.get("/get-fruit-by-id/:id", async (req, res) => {
  // : id param
  try {
    const { id } = req.params; // lấy dữ liệu thông qua id trên url gọi là param
    const data = await Fruits.findById(id).populate("id_distributor");
    res.json({
      status: 200,
      messenger: "Danh sách fruit",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
});
// get danh sách fruits

router.get("/get-list-fruit-in-price", async (req, res) => {
  try {
    const { price_start, price_end } = req.query; // lấy dữ liệu thong qua : id trên url gọi là param
    const query = { price: { $gte: price_start, $lte: price_end } };
    // $gte lớn hơn hoạc bằng, $ge lớn hơn
    // $lte nhỏ hơn hoặc bằng,
    // truỳen câu dk và chỉ lấy các trường mong muốn
    const data = await Fruits.find(query, "name quantity price id_distributor")
      .populate("id_distributor")
      .sort({ quantity: -1 }) // giảm dần  =-1 , tăng dần =1
      .skip(0) // bỏ qua lấy số lượng
      .limit(2); // lấy 2 sản phẩm

    res.json({
      status: 200,
      messenger: "danh sách fruit",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
});
// get danh sách fruits có chữ cái bắt đầu tên là A hoặc X
router.get("/get-list-fruit-have-name-a-or-x", async (req, res) => {
  // id param
  try {
    const query = {
      $or: [{ name: { $regex: "T" } }, { name: { $regex: "X" } }],
    };
    // truyền câu điều kiện, và chỉ lấy các trường mong muốn
    const data = await Fruits.find(
      query,
      "name quantity price id_distributor"
    ).populate("id_distributor");

    res.json({
      status: 200,
      messenger: "danh sách fruit",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
});
// api cập nhật fruit
router.put("/update-fruit-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body; // lấy dữ liệu từ body
    const updatefruit = await Fruits.findById(id);
    let result = null;
    if (updatefruit) {
      updatefruit.name = data.name ?? updatefruit.name;
      (updatefruit.quantity = data.quantity ?? updatefruit.quantity),
        (updatefruit.price = data.price ?? updatefruit.price),
        (updatefruit.status = data.status ?? updatefruit.status),
        (updatefruit.image = data.image ?? updatefruit.image),
        (updatefruit.description = data.description ?? updatefruit.description),
        (updatefruit.id_distributor =
          data.id_distributor ?? updatefruit.id_distributor);
      result = await updatefruit.save();
    }
    // tạo một đối tượng mới
    // thêm vào database
    if (result) {
      // nếu thêm thành cong resuslt !null trả về dữ liệu
      res.json({
        status: 200,
        messenger: "Cập nhật thành công",
        data: result,
      });
    } else {
      // Nếu thêm không thành công result null, thông báo không thành công
      res.json({
        status: 400,
        messenger: "Lỗi, Cập nhật không thành công",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
});
// api xóa một fruit
router.delete("/destroy-fruit-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Fruits.findByIdAndDelete(id);
    if (result) {
      // nếu xóa thành công sẽ trả về item đã xóa
      res.json({
        status: 200,
        messenger: "Xóa thành công",
        data: result,
      });
    } else {
      res.json({
        status: 400,
        messenger: "Lỗi, xóa không thành công ",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
});
// thêm thông tin 1 fruit và upload ảnh thông qua multer
const Upload = require("../config/common/upload");
router.post(
  "/add-fruit-with-file-image",
  Upload.array("image", 5),
  async (req, res) => {
    // Upload.array('image',5) => up nhiều file tối đa là 5
    // upload.single('image) => upload 1 file
    try {
      const data = req.body; // lấy dữ liệu từ body
      const { files } = req; // files nếu upload nhiều, file nếu upload 1 file
      const urlsImage = files.map(
        (file) =>
          `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );
      // url hình ảnh sẽ được lưu dưới dạng: http://localhost:3000/upload/filename
      const newfruit = new Fruits({
        name: data.name,
        quantity: data.quantity,
        price: data.price,
        status: data.status,
        image: urlsImage, // Thêm url hình
        description: data.description,
        id_distributor: data.id_distributor,
      }); // tạo một đối tượng mới
      const result = await newfruit.save(); // thêm vào database
      if (result) {
        // nếu thêm thành công result !null trả về dữ liệu
        res.json({
          status: 200,
          messenger: "Thêm thành công",
          data: result,
        });
      } else {
        // nếu thêm không thành công result null, thông báo không thành công
        res.json({
          status: 400,
          messenger: "Lỗi, thêm không thành cong",
          data: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
);
module.exports = router;
