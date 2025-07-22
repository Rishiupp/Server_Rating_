const { getClient } = require('../lib/graphClient');

const driveItemId   = process.env.EXCEL_DRIVE_ITEM_ID;
const worksheetName = process.env.EXCEL_WORKSHEET_NAME;
const tableName     = process.env.EXCEL_TABLE_NAME;

exports.appendToWorkbookOnline = async rows => {
  const client = await getClient();

  // Build values array: each row as an array in column order
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

  // Append rows to the online table
  await client
    .api(
      `/me/drive/items/${driveItemId}` +
      `/workbook/worksheets('${worksheetName}')` +
      `/tables('${tableName}')/rows/add`
    )
    .post({ values });
};