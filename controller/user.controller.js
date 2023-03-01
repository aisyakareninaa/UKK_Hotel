const { response, request } = require("express");
const { JsonWebTokenError } = require("jsonwebtoken");
const md5 = require("md5");
const { Op } = require("sequelize");
const { sequelize } = require("../models/index");
const upload = require("./upload-user").single(`foto`);
const modelUser = require("../models/index").user;
const query = require("sequelize").Op



// exports.login = async (request, response) => {
//   try {
//     const params = {
//       email: request.body.email,
//       password: md5(request.body.password),
//     };

//     const findUser = await user.findOne({ where: params });
//     if (findUser == null) {
//       return response.status(404).json({
//         message: "email or password doesn't match",
//         err: error,
//       });
//     }
//     console.log(findUser)
//     //generate jwt token
//     let tokenPayLoad = {
//       id: findUser.id,
//       email: findUser.email,
//       role: findUser.role,
//     };
//     tokenPayLoad = JSON.stringify(tokenPayLoad);
//     let token = await JsonWebToken.sign(tokenPayLoad, SECRET_KEY);

//     return response.status(200).json({
//       message: "Success login yey",
//       data: {
//         token: token,
//         id: findUser.id,
//         email: findUser.email,
//         role: findUser.role,
//       },
//     });

//   } catch (err) {
//     console.log(err);
//     return response.status(500).json({
//       message: "Internal error",
//       err: err,
//     });
//   }
// };
/** create function for r all data */
exports.getAllUser = async (request, response) => {
  /** call findAll() to get all data */
  let users = await modelUser.findAll(); //digunakan untuk mendapatkan semua data dari tabel dan parameter pencarian yang dikehendaki. Hasil perintah ini berupa array
  return response.json({
    success: true,
    data: users,
    message: `All Users have been loaded`,
  });
};

/** create function for filter / finding data*/
exports.findUser = async (request, response) => {
  /** define keyword to find data */
  let nama_user = request.body.nama_user;
  /** call findAll() within where clause and operation
   * to find data based on keyword */
  let users = await modelUser.findAll({
    //bisa memakai findOne jika data yang akan dicari spesifik(1)
    where: {
      [query.or]: [{ nama_user: { [query.substring]: nama_user } }],
    },
  });
  return response.json({
    success: true,
    data: users,
    message: `All Users have been loaded`,
  });
};

/** create function for add new member */
exports.addUser = (request, response) => {
    upload(request, response, async (error) => {
      if (error) {
        console.log("err");
        return response.json({ message: error });
      }
      if (!request.file) {
        return response.json({ message: `Nothing file to Upload` });
      }
    let newUser = {
      nama_user: request.body.nama_user,
      foto: request.file.filename,
      email: request.body.email,
      password: md5(request.body.password),
      role: request.body.role,
    };
    console.log(newUser);
    modelUser
      .create(newUser)
      .then((result) => {
        return response.json({
          success: true,
          data: result,
          message: `New User has been inserted`,
        });
      })
      .catch((error) => {
        return response.json({
          succes: false,
          messagee: error.message,
        });
      });
    });
  };

 /** create function to update book */
exports.updateUser = async (request, response) => {
  /** run upload function */
  upload(request, response, async (error) => {
    /** check if there are error when upload */
    if (error) {
      return response.json({ message: error });
    }
    /** store selected book ID that will update */
    let id = request.params.id;
    /** prepare book's data that will update */
    let users = {
      nama_user: request.body.nama_user,
      email: request.body.email,
      password: request.body.password,
      role: request.body.role,

    };
    /** check if file is not empty,
     * it means update data within reupload file
     */
    if (request.file) {
      /** get selected book's data */
      const selectedBook = await modelBooks.findOne({
        where: { id: id },
      });
      /** get old filename of cover file */
      const oldCoverBook = selectedBook.cover;
      /** prepare path of old cover to delete file */
      const pathCover = path.join(__dirname, `../cover`, oldCoverBook);
      /** check file existence */
      if (fs.existsSync(pathCover)) {
        /** delete old cover file */
        fs.unlink(pathCover, (error) => console.log(error));
      }
      /** add new cover filename to book object */
      book.cover = request.file.filename;
    }
    /** execute update data based on defined id book */
    modelBooks
      .update(book, { where: { id: id } })
      .then((result) => {
        /** if update's process success */
        return response.json({
          success: true,
          message: `Data book has been updated`,
        });
      })
      .catch((error) => {
        /** if update's process fail */
        return response.json({});
      });
  });
};
  exports.deleteUser = (request, response) => {
    let idUser = request.params.id;
    memberModel
      .destroy({ where: { id: idUser } })
      .then((result) => {
        return response.json({
          success: true,
          message: `Data user has been updated`,
        });
      })
      .catch((error) => {
        return response.json({
          success: false,
          message: error.message,
        });
      });
  };
