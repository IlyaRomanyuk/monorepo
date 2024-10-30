import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model';
import { UserRepository } from './repositories/user.repository';
import { UserQueries } from './user.queries';
import { UserCommands } from './user.commands';
import { UserService } from './user.service';
import { UserEventEmiiter } from './user.event-immiter';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserRepository, UserService, UserEventEmiiter],
  exports: [UserRepository],
  controllers: [UserQueries, UserCommands],
})
export class UserModule {}
