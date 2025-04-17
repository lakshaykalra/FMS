import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { FlightModule } from './flight/flight.module';
import { FareModule } from './fare/fare.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/entities/user.entity';
import { Booking } from './booking/entities/booking.entity';
import { Flight } from './flight/entities/flight.entity';
import { Seat } from './flight/entities/seat.entity';
import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Booking, Flight, Seat],
      autoLoadModels: true,
      synchronize: true, // Disable default synchronize
      // sync: { force: true }, // Force synchronization by dropping and recreating tables
    }),
    SequelizeModule.forFeature([User, Booking, Flight, Seat]),
    UserModule,
    BookingModule,
    FlightModule,
    FareModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'SEQUELIZE',
      useFactory: async () => {
        const sequelize = new Sequelize({
          dialect: process.env.DB_DIALECT as any,
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT, 10),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        });
        await sequelize.authenticate();
        return sequelize;
      },
    },
  ],
})
export class AppModule {}
