const { knex } = require('../config/database');

exports.Authorization = async function (req, res, next) {
  try {
    const key = req.headers.authorization;
    if (key == undefined) throw 'Unauthorized';
    await knex('apikey')
      .select()
      .where({ key })
      .first()
      .then((row) => {
        if (row == undefined) throw 'Unauthorized';
      });
    next();
  } catch (error) {
    res.status(401).json({
      code: 401,
      message: 'Unauthorized',
    });
  }
};
