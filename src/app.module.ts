import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesModule } from './countries/countries.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {LoggerModule} from "nestjs-pino";
import * as Joi from "joi";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      PORT: Joi.string().required(),
    }),
  }),
    LoggerModule.forRootAsync({
      useFactory: (configService: ConfigService) => {

        const isProduction = configService.get('NODE_ENV') === 'production';
        return {
          pinoHttp: {
            transport: isProduction ? undefined
              : {
                target: 'pino-pretty',
                options: {
                  singleLine: true,
                },
                level: isProduction ? 'info' : 'debug',
              },
          },
        };
      },
      inject: [ConfigService],
    }),
    CountriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
