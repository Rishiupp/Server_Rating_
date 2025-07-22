const excelService = require('../services/excelService');
const path         = require('path');

const filePath = path.join(__dirname, '../data/rating.xlsx');

exports.generateExcel = async (req, res, next) => {
  try {
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

    const row = { LeadId, Name, Bounces, Gambling, Salary, DOB, Company_type, City };
    await excelService.appendToWorkbook([row]);
    return res.json({ message: 'Row appended to rating.xlsx successfully' });
  } catch (err) {
    next(err);
  }
};

exports.downloadExcel = async (req, res, next) => {
  try {
    // Ensure workbook exists (creates if missing)
    await excelService.ensureWorkbookExists();

    // Send the file as an attachment
    res.download(filePath, 'rating.xlsx', (err) => {
      if (err) next(err);
    });
  } catch (err) {
    next(err);
  }
};
