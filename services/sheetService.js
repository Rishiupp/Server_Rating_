const { getSheetsClient } = require('../lib/sheetsClient');

const sheetId = process.env.GOOGLE_SHEET_ID;
const sheetName = 'Ratings';

exports.appendToGoogleSheet = async rows => {
  const sheets = await getSheetsClient();
  const values = rows.map(r => [
    r.LeadId,
    r.Name,
    r.Bounces,
    r.Gambling,
    r.Salary,
    r.DOB,
    r.Company_type,
    r.City
  ]);

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${sheetName}!A1`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values }
  });
};