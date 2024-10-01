import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { TwilioService } from './twilio.service';

@Controller('twilio')
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  @Post('webhook')
  async handleIncomingMessage(@Req() req: any, @Res() res: any) {
    const incomingMessage = req.body.Body; // WhatsApp message text
    const from = req.body.From; // WhatsApp sender's number

    try {
      await this.twilioService.handleIncomingMessage(incomingMessage, from);
      return res.status(200).send('Message sent successfully');
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error handling message');
    }
  }
}
