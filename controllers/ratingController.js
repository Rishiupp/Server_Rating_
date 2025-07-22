const excelService = require('../services/excelService');

exports.generateExcel = async (req, res, next) => {
  try {
    // 1. Validate payload
    const {
      Bounces,
      Gambling,
      Salary,
      DOB,
      Company_type,
      City
    } = req.body;

    if (
      Bounces == null ||
      Gambling == null ||
      Salary == null ||
      !DOB ||
      !Company_type ||
      !City
    ) {
      return res.status(400).json({ error: 'Missing required field(s)' });
    }

    // 2. Assemble data row
    const row = { Bounces, Gambling, Salary, DOB, Company_type, City };

    // 3. Delegate to service
    await excelService.buildAndSendWorkbook([row], res);
  } catch (err) {
    next(err);
  }
};
