import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Sequelize } from 'sequelize';
import { MESSAGES } from './constants/message-constants';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize
  ) {}

  @Get('health')
  async healthCheck(): Promise<{ status: string }> {
    try {
      await this.sequelize.authenticate();
      const [result] = await this.sequelize.query('SELECT 1 + 1 AS result');
      if (result) {
        return { status: MESSAGES.APP.HEALTHY };
      }
      return { status: MESSAGES.APP.QUERY_FAILED };
    } catch (error) {
      return { status: MESSAGES.APP.CONNECTION_FAILED };
    }
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
