import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter;

  constructor(private readonly config: ConfigService) {}

  async init() {
    const OAuth2 = google.auth.OAuth2;
    const OAUTH_CLIENT_ID = this.config.get('OAUTH_CLIENT_ID');
    const OAUTH_CLIENT_SECRET = this.config.get('OAUTH_CLIENT_SECRET');

    const oauth2Client = new OAuth2(
      OAUTH_CLIENT_ID,
      OAUTH_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground',
    );

    oauth2Client.setCredentials({
      refresh_token: this.config.get('OAUTH_REFRESH_TOKEN'),
    });

    const accessToken = await oauth2Client.getAccessToken();

    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: this.config.get('EMAIL_USER'),
        clientId: OAUTH_CLIENT_ID,
        clientSecret: OAUTH_CLIENT_SECRET,
        refreshToken: this.config.get('OAUTH_REFRESH_TOKEN'),
        accessToken: accessToken?.token,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    if (!this.transporter) {
      await this.init();
    }

    const mailOptions = {
      from: this.config.get('EMAIL_USER'),
      to,
      subject,
      text,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
