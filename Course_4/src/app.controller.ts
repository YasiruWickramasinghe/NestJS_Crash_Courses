import { Controller, Delete, Get, Post, Put, Param, Body, HttpCode } from '@nestjs/common';
import { ReportType } from './database/data'
import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {

  constructor(private readonly appService: AppService) { }

  @Get()
  getAllReports(@Param('type') type: string) {
    //check type in parameter
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.getAllReports(reportType)
  }

  @Get(':id')
  //check parameters type as well as id
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.getReportById(reportType, id)
  }

  @Post()
  createReport(@Body() { amount, source }: { amount: number; source: string; }, @Param('type') type: string) {
    //set bodt data
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.createReport(reportType, { amount, source })
  }

  @Put(':id')
  updateReport(@Param('type') type: string, @Param('id') id: string, @Body() body: { amount: number; source: string; }
  ) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.updateReport(reportType, id, body)
  }

  @HttpCode(204)
  @Delete(":id")
  deleteReport(@Param('id') id: string,) {
    return this.appService.deleteReport(id)
  }
}
