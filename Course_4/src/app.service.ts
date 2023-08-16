import { Injectable } from '@nestjs/common';
import { ReportType, data } from './database/data';
import { v4 as uuid } from "uuid"

//initialize body types
interface Report {
  amount: number,
  source: string
}

//initialize body types can be optional by using '?'
interface UpdateReport {
  amount?: number,
  source?: string
}

@Injectable()
export class AppService {

  getAllReports(type: ReportType) {
    return data.report.filter((report) => report.type === type);
  }

  getReportById(type: ReportType, id: string) {
    return data.report.filter((report) => report.type === type).find(report => report.id === id)
  }

  createReport(type: ReportType, { amount, source }: Report) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    }
    data.report.push(newReport)
    return newReport;
  }

  updateReport(type: ReportType, id: string, body: UpdateReport) {
    //find id to update
    const reportToUpdate = data.report.filter((report) => report.type === type).find(report => report.id === id)

    //if report not exist
    if (!reportToUpdate) return;

    //find index to update the data in array
    const reportIndex = data.report.findIndex((report) => report.id === reportToUpdate.id)

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date()
    }

    return data.report[reportIndex]
  }

  deleteReport(id: string) {
    //find index to delete the data in array
    const reportIndex = data.report.findIndex((report) => report.id === id)

    //if report not exist
    if (reportIndex === -1) return;

    data.report.splice(reportIndex, 1)

    return;
  }
}
