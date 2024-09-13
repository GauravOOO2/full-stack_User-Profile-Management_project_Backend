import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Profile } from '@prisma/client';
import { CreateProfileDto } from '../users/dto/create-profile.dto';
import { UpdateProfileDto } from '../users/dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Profile[]> {
    return this.prisma.profile.findMany();
  }

  async findOneByUserId(userId: number): Promise<Profile> {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException(`Profile for user with ID ${userId} not found`);
    }

    return profile;
  }

  async createOrUpdateProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    const { userId, ...profileData } = createProfileDto;

    return this.prisma.profile.upsert({
      where: { userId },
      update: profileData,
      create: { userId, ...profileData },
    });
  }

  async updateProfileByUserId(userId: number, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    const existingProfile = await this.prisma.profile.findUnique({ where: { userId } });

    if (!existingProfile) {
      throw new NotFoundException(`Profile for user with ID ${userId} not found`);
    }

    return this.prisma.profile.update({
      where: { userId },
      data: updateProfileDto,
    });
  }

  async removeByUserId(userId: number): Promise<Profile> {
    const existingProfile = await this.prisma.profile.findUnique({ where: { userId } });

    if (!existingProfile) {
      throw new NotFoundException(`Profile for user with ID ${userId} not found`);
    }

    return this.prisma.profile.delete({
      where: { userId },
    });
  }
}
