import express from 'express';
import Sequelize from 'sequelize';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    let where = {};
    if (req.query.lastId) {
      where = {
        id: {
          [Sequelize.Op.lt]: req.query.lastId,
        },
      };
    }
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

export default router;
