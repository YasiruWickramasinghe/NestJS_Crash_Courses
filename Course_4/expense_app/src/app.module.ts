import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
// import { CustomInterceptor } from "./interceptor/custom.interceptor"
import { SummaryModule } from './summary/summary.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [SummaryModule, ReportModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    //we can use this inbuild interceptor or Custom interceptor
    useClass: ClassSerializerInterceptor,
    //this is custom intecepter do exactly same as ClassSerializerInterceptor
    // useClass: CustomInterceptor,
  }],
})
export class AppModule {}
