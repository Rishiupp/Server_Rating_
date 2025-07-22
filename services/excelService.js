const ExcelJS = require('exceljs');
const path    = require('path');
const fs      = require('fs');

const filePath = path.join(__dirname, '../data/rating.xlsx');

exports.appendToWorkbook = async (rows) => {
  const workbook = new ExcelJS.Workbook();
  let sheet;

  // Load or create
  if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
    try {
      await workbook.xlsx.readFile(filePath);
      sheet = workbook.getWorksheet('Ratings');
    } catch (err) {
      console.warn('Existing file unreadable – starting fresh.');
      sheet = workbook.addWorksheet('Ratings');
    }
  } else {
    sheet = workbook.addWorksheet('Ratings');
  }

  // Define headers if first time
  if (sheet.columnCount === 0) {
    sheet.columns = [
      { header: 'Lead ID',       key: 'LeadId',       width: 15 },
      { header: 'Name',          key: 'Name',         width: 25 },
      { header: 'Bounces',       key: 'Bounces',      width: 15 },
      { header: 'Gambling',      key: 'Gambling',     width: 15 },
      { header: 'Salary',        key: 'Salary',       width: 20 },
      { header: 'DOB',           key: 'DOB',          width: 15 },
      { header: 'Company Type',  key: 'Company_type', width: 20 },
      { header: 'City',          key: 'City',         width: 20 }
    ];
  }

  // Append rows
  rows.forEach(r => sheet.addRow(r));

  // Ensure directory
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write to a temp file first
  const tmpPath = filePath + '.tmp';
  await workbook.xlsx.writeFile(tmpPath);

  // Atomically replace the real file
  try {
    fs.renameSync(tmpPath, filePath);
  } catch (renameErr) {
    console.warn('Rename failed – falling back to copy:', renameErr);
    fs.copyFileSync(tmpPath, filePath);
    fs.unlinkSync(tmpPath);
  }
};
