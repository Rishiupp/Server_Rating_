const ExcelJS = require('exceljs');
const path    = require('path');
const fs      = require('fs');

const filePath = path.join(__dirname, '../data/rating.xlsx');

exports.appendToWorkbook = async (rows) => {
  const workbook = new ExcelJS.Workbook();

  // 1. If the file exists, load it; otherwise create & set headers
  if (fs.existsSync(filePath)) {
    await workbook.xlsx.readFile(filePath);
  } else {
    const sheet = workbook.addWorksheet('Ratings');
    sheet.columns = [
      { header: 'Bounces',      key: 'Bounces',      width: 15 },
      { header: 'Gambling',     key: 'Gambling',     width: 15 },
      { header: 'Salary',       key: 'Salary',       width: 20 },
      { header: 'DOB',          key: 'DOB',          width: 15 },
      { header: 'Company Type', key: 'Company_type', width: 20 },
      { header: 'City',         key: 'City',         width: 20 }
    ];
  }

  // 2. Get (or re-add) the worksheet
  const sheet = workbook.getWorksheet('Ratings') 
              || workbook.addWorksheet('Ratings');

  // 3. Append each new row
  rows.forEach(r => sheet.addRow(r));

  // 4. Save back to disk
  await workbook.xlsx.writeFile(filePath);
};
