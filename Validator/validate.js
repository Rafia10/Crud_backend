const { validationResult } = require("express-validator");

export const validator = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors.array());
  }
};
