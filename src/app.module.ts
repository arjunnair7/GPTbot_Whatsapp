import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwilioModule } from './twilio/twilio.module';
import { ConfigModule } from '@nestjs/config';
import { TwilioController } from './twilio/twilio.controller';
import { TwilioService } from './twilio/twilio.service';

@Module({
  imports: [TwilioModule,ConfigModule.forRoot()],
  controllers: [AppController,TwilioController],
  providers: [AppService,TwilioService],
})
export class AppModule {}
