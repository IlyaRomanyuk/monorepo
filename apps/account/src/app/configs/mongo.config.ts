import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const getMongoConfig = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: () => ({
      uri: 'mongodb://admin:admin@localhost:27018/purple?authSource=admin',
    }),
    inject: [ConfigService],
    imports: [ConfigModule],
  };
};

// const getMongoString = (configService: ConfigService) =>
//   'mongodb://' +
//   configService.get('MONGO_LOGIN') +
//   ':' +
//   configService.get('MONGO_PASSWORD') +
//   '@' +
//   configService.get('MONGO_HOST') +
//   ':' +
//   configService.get('MONGO_PORT') +
//   '/' +
//   configService.get('MONGO_DATABASE') +
//   '?authSource=' +
//   configService.get('MONGO_AUTHDATABASE');
