const { response, request } = require("express");
const md5 = require("md5");
const { Op } = require("sequelize");
const { sequelize } = require("../models/index");
const upload = require("./upload-kamar").single(`foto`);
const modelTipeKamar = require("../models/index").tipe_kamar;
const query = require("sequelize").Op;

/** create function for read all data */
exports.getAllTipekamar = async (request, response) => {
  /** call findAll() to get all data */
  let tipe_kamars = await modelTipeKamar.findAll(); //digunakan untuk mendapatkan semua data dari tabel dan parameter pencarian yang dikehendaki. Hasil perintah ini berupa array
  return response.json({
    success: true,
    data: tipe_kamars,
    message: `All Room Types have been loaded`,
  });
};

/** create function for filter / finding data*/
exports.findTipeKamar = async (request, response) => {
  /** define keyword to find data */
  let nama_tipe_kamar = request.body.nama_tipe_kamar;
  /** call findAll() within where clause and operation
   * to find data based on keyword */
  let tipe_kamars = await modelTipeKamar.findAll({
    //bisa memakai findOne jika data yang akan dicari spesifik(1)
    where: {
      [query.or]: [{ nama_tipe_kamar: { [query.substring]: nama_tipe_kamar } }],
    },
  });
  return response.json({
    success: true,
    data: tipe_kamars,
    message: `All Users have been loaded`,
  });
};

/** create function for add new member */
exports.addTipeKamar = (request, response) => {
  upload(request, response, async (error) => {
    if (error) {
      console.log("err");
      return response.json({ message: error });
    }
    if (!request.file) {
      return response.json({ message: `Nothing file to Upload` });
    }
    let newTipeKamar = {
      nama_tipe_kamar: request.body.nama_tipe_kamar,
      harga: request.body.harga,
      deskripsi: request.body.deskripsi,
      foto: request.file.filename,
    };
    console.log(newTipeKamar);
    modelTipeKamar
      .create(newTipeKamar)
      .then((result) => {
        return response.json({
          success: true,
          data: result,
          message: `New Room Type has been inserted`,
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
exports.updateTipeKamar = async (request, response) => {
  /** run upload function */
  upload(request, response, async (error) => {
    /** check if there are error when upload */
    if (error) {
      return response.json({ message: error });
    }
    /** store selected book ID that will update */
    let id = request.params.id;
    /** prepare book's data that will update */
    let tipe_kamars = {
      nama_tipe_kamar: request.body.nama_tipe_kamar,
      harga: request.body.harga,
      deskripsi: request.body.deskripsi,
      foto: request.file.filename,
    };
    /** check if file is not empty,
     * it means update data within reupload file
     */
    if (request.file) {
      /** get selected book's data */
      const selectedBook = await modelTipeKamar.findOne({
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
exports.deleteTipeKamar= (request, response) => {
  let idTipeKamar = request.params.id;
  modelTipeKamar
    .destroy({ where: { id: idTipeKamar} })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data Room Types has been updated`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};
