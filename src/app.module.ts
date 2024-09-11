// src/app.module.ts
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, ProfilesModule, PrismaModule],
})
export class AppModule {}
