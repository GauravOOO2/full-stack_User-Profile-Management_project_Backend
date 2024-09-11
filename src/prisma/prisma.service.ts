// src/prisma.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor() {
    super();
    this.$connect(); // Ensure Prisma Client is connected to the database
  }

  async onModuleDestroy() {
    await this.$disconnect(); // Disconnect Prisma Client when the module is destroyed
  }
}
