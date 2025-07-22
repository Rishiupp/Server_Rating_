const sheetService = require('../services/sheetService');

exports.generateExcel = async (req, res, next) => {
  try {
    const { LeadId, Name, Bounces, Gambling, Salary, DOB, Company_type, City } = req.body;
    if ([LeadId, Name, Bounces, Gambling, Salary, DOB, Company_type, City].some(v => v == null)) {
      return res.status(400).json({ error: 'Missing required field(s)' });
    }

    const row = { LeadId, Name, Bounces, Gambling, Salary, DOB, Company_type, City };
    await sheetService.appendToGoogleSheet([row]);
    res.json({ message: 'Row appended to Google Sheet successfully' });
  } catch (err) {
    next(err);
  }
};