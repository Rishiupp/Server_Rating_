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

    // 3. Append to the existing Excel file
    await excelService.appendToWorkbook([row]);

    // 4. Send a simple JSON response
    return res.json({ message: 'Row appended to rating.xlsx successfully' });
  } catch (err) {
    next(err);
  }
};
