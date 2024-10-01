import { Module } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { TwilioController } from './twilio.controller';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule

@Module({
  imports: [ConfigModule], // Import ConfigModule here
  providers: [TwilioService],
  controllers: [TwilioController],
})
export class TwilioModule {}
