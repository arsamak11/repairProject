const Service = require("../models/Service.model");
const User = require("../models/User.model");
const path = require("path");
const jwt = require("jsonwebtoken");

module.exports.serviceController = {
  addService: async (req, res) => {
    const { name, price, address, square, description, image } = req.body;
    try {
      const service = await Service.create({
        user: req.user.id,
        pathImages: image,
        name,
        price,
        address,
        square,
        description,
      });
      res.json(service);
    } catch (e) {
      res.status(401).json("Ошибка при добавлении");
    }
  },

  getServices: async (req, res) => {
    try {
      const { page = 1, limit = 9 } = req.query;
      const services = await Service.find();
      const pages = Math.ceil(services.length / 9);

      const service = await Service.find()
        .populate("application.userId")
        .limit(limit * 1)
        .skip((page - 1) * limit);

      res
        .status(200)
        .json({ service, pages, success: "Услуги успешно загружены" });
    } catch (e) {
      res.json("Ошибка");
    }
  },

  getServiceOne: async (req, res) => {
    try {
      const service = await Service.findById(req.params.id);
      res.json(service);
    } catch (e) {
      res.json("Ошибка");
    }
  },

  editService: async (req, res) => {
    try {
      const service = await Service.findByIdAndUpdate(req.params.id, req.body);
      res.json("Успешно изменено");
    } catch (e) {
      res.json("error");
    }
  },

  toggleTicket: async (req, res) => {
    try {
      const service = await Service.findOneAndUpdate(
        {
          _id: req.params.ticketId,
          "application.$.userId": req.params.id,
        },
        {
          $set: {
            "application.$.accepted": req.params.type === "approve",
          },
        },
        { new: true }
      ).populate("application.userId");
      res.send([service]);
    } catch (e) {
      console.log(e);
      res.json("error");
    }
  },

  deleteService: async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      const service = await Service.findById(id);
      if (service.user.toString() === req.user.id) {
        await service.remove();

        res.json("Успешно удален!");
      }
      return res.status(401).json("Ошибка: нет доступа");
    } catch (e) {
      return res.status(401).json("Ошибка: " + e.toString());
    }
  },

  addImage: async (req, res) => {
    try {
      const img = req.files.image;
      const newFileName = `./image/${
        Math.random() * 10000000000000000
      }${path.extname(img.name)}`;

      img.mv(newFileName, async (err) => {
        if (err) {
          console.log(err);
        } else {
          res.json({
            success: "file uploaded",
            image: newFileName,
          });
        }
      });
    } catch (e) {
      res.json(e);
    }
  },

  getServicesCategory: async (req, res) => {
    try {
      const service = await Service.find({ category: req.params.id });
      res.json(service);
    } catch (e) {
      res.json("Ошибка");
    }
  },
  getUserService: async (req, res) => {
    const { id } = req.user;
    try {
      const service = await Service.find({ user: id });
      res.json(service);
    } catch (e) {
      res.json(e);
    }
  },

  addApplicationUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(req.user.id);

      const service = await Service.findById(req.params.id);

      const exists = service.application.find(
        (app) => app.userId.toString() === req.user.id
      );

      if (exists) {
      } else {
        const service = await Service.findByIdAndUpdate(
          req.params.id,
          {
            $addToSet: {
              application: { userId: req.user.id, accepted: false },
            },
          },
          { new: true }
        );
      }
      res.status(200).json();
    } catch (e) {
      console.log(e);
      res.status(401).json("Ошибка при отправки заявки");
    }
  },

  getApplicationUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(req.user.id);

      const service = await Service.findById(req.params.id);

      const exists = service.application.find(
        (app) => app.userId.toString() === req.user.id
      );

      res.status(200).send(exists);
    } catch (e) {
      console.log(e);
      res.status(401).json("Ошибка при отправки заявки");
    }
  },

  // getUserServiceOne: async (req, res) => {
  //   try {
  //     const service = await Service.findById(req.params.id);
  //     res.json(service);
  //   } catch (e) {
  //     res.json("Ошибка");
  //   }
  // },
};
