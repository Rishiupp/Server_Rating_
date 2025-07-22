// controllers/ratingController.js
const excelService = require('../services/excelService');

exports.generateExcel = async (req, res, next) => {
  try {
    // 1. Validate payload
    const {
      LeadId,
      Name,
      Bounces,
      Gambling,
      Salary,
      DOB,
      Company_type,
      City
    } = req.body;

    // Ensure none of the required fields are missing
    if (
      LeadId == null ||
      !Name ||
      Bounces == null ||
      Gambling == null ||
      Salary == null ||
      !DOB ||
      !Company_type ||
      !City
    ) {
      return res.status(400).json({ error: 'Missing required field(s)' });
    }

    // 2. Assemble data row (match the service’s column keys exactly)
    const row = { LeadId, Name, Bounces, Gambling, Salary, DOB, Company_type, City };

    // 3. Append to the existing Excel file
    await excelService.appendToWorkbook([row]);

    // 4. Return success
    res.json({ message: 'Row appended to rating.xlsx successfully' });
  } catch (err) {
    next(err);
  }
};
