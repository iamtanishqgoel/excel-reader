import { NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import path from 'path';

export async function GET() {
  try {
    const workbook = new ExcelJS.Workbook();
    const filePath = path.join(process.cwd(), 'excel', 'spreadsheet.xlsx');
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(1);
    let data = [];

    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      let rowData = [];
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        rowData.push({
          value: cell.value,
          style: {
            font: cell.font,
            fill: cell.fill,
            alignment: cell.alignment,
          },
          isMerged: cell.isMerged,
          mergeInfo: cell.isMerged ? {
            top: cell.master.row,
            left: cell.master.col,
            bottom: cell.master.row + cell.master.rowSpan - 1,
            right: cell.master.col + cell.master.colSpan - 1
          } : null
        });
      });
      data.push(rowData);
    });
 
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading Excel file:', error);
    return NextResponse.json({ error: 'Failed to read Excel file' }, { status: 500 });
  }
}