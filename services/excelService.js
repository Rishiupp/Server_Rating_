const ExcelJS = require('exceljs');

exports.buildAndSendWorkbook = async (rows, res) => {
  // 1. Create workbook & sheet
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Ratings');

  // 2. Define columns (in order)
  sheet.columns = [
    { header: 'Bounces', key: 'Bounces', width: 15 },
    { header: 'Gambling', key: 'Gambling', width: 15 },
    { header: 'Salary', key: 'Salary', width: 20 },
    { header: 'DOB', key: 'DOB', width: 15 },
    { header: 'Company Type', key: 'Company_type', width: 20 },
    { header: 'City', key: 'City', width: 20 }
  ];

  // 3. Add rows
  rows.forEach(r => sheet.addRow(r));

  // 4. Set response headers for download
  res.setHeader(
    'Content-Disposition',
    'attachment; filename="rating.xlsx"'
  );
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );

  // 5. Stream workbook to response
  await workbook.xlsx.write(res);
  res.end();
};
