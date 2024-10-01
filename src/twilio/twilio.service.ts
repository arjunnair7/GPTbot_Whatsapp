import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import axios from 'axios';

@Injectable()
export class TwilioService {
  private client: Twilio;

  constructor(private configService: ConfigService) {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
    this.client = new Twilio(accountSid, authToken);
  }

  async sendMessage(to: string, message: string): Promise<any> {
    const from = this.configService.get<string>('TWILIO_WHATSAPP_NUMBER');
    console.log(`Sending message from: ${from} to: ${to}`);
    return this.client.messages.create({
      from: `${from}`,
      to: `${to}`,
      body: message,
    });
  }

  async getGPT4Response(message: string): Promise<string> {
    const apiKey = this.configService.get<string>('GPT_API_KEY');  
  
    const gptUrl = 'https://api.openai.com/v1/chat/completions';
  
    try {
      const response = await axios.post(
        gptUrl,
        {
          model: 'gpt-4',
          messages: [{ role: 'user', content: message }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,  
          },
        },
      );
  
      const gptMessage = response.data.choices[0].message.content;
      return gptMessage;
    } catch (error) {
      console.error('Error fetching GPT-4 response:', error.response?.data || error.message);
      throw new Error('Error generating response from GPT-4');
    }
  }
  
  async handleIncomingMessage(message: string, from: string) {
    const gptResponse = await this.getGPT4Response(message);
    return this.sendMessage(from, gptResponse);
  }
}
