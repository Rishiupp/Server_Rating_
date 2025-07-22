const excelService = require('../services/excelService');

exports.generateExcel = async (req, res, next) => {
  try {
    const { LeadId, Name, Bounces, Gambling, Salary, DOB, Company_type, City } = req.body;
    if ([LeadId, Name, Bounces, Gambling, Salary, DOB, Company_type, City]
        .some(v => v == null)) {
      return res.status(400).json({ error: 'Missing required field(s)' });
    }

    const row = { LeadId, Name, Bounces, Gambling, Salary, DOB, Company_type, City };
    await excelService.appendToWorkbookOnline([row]);
    res.json({ message: 'Row appended to online Excel successfully' });
  } catch (err) {
    next(err);
  }
};