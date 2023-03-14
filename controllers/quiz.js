const db = require("../models");
const Quiz = db.quizzes;

exports.create = async (req, res) => {
  try {
    const data = await Quiz.create(req.body);
    res.json({
      message: "quiz berhasil dibuat",
      data: data,
    });
  } catch (eror) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const quizzes = await Quiz.findAll();
    res.json({
      message: "quiz berhasil ditampilkan semuanya",
      data: quizzes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true });
    quiz.update(req.body, {
      where: { id },
    });
    res.json({
      message: "Data berhasil diubah",
      data: quiz,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occurred while retrieving quiz",
      data: null,
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true });

    quiz.destroy();

    res.json({
      message: "quiz berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occurred while retrieving quiz",
      data: null,
    });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true });
    res.json({
      message: `quiz berhasil dicari dengan id=${id}.`,
      data: quiz,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occurred while retrieving quiz",
      data: null,
    });
  }
};

exports.getByCategoryId = async (req, res) => {
  const id = req.params.id
  const quizzes = await Quiz.findAll({
    where: {
      categoryId: id
    }
  })
  res.json({
    message: `quiz berhasil dicari dengan categoryid=${id}`,
    data: quizzes,
  });
};

exports.getByLevelId = async (req, res) => {
  const id = req.params.id;
  const quizzes = await Quiz.findAll({
    where: {
      levelId: id,
    },
  });
  res.json({
    message: `quiz berhasil dicari dengan levelId=${id}`,
    data: quizzes,
  });
};
