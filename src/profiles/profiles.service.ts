import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';  // Ensure you have PrismaService set up
import { Profile } from '@prisma/client';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Profile[]> {
    return this.prisma.profile.findMany();
  }

  async findOne(id: number): Promise<Profile> {
    const profile = await this.prisma.profile.findUnique({
      where: { id },
    });

    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    return profile;
  }

  async create(data: {
    userId: number;
    email: string;
    gender: string;
    address: string;
    pincode: string;
    city: string;
    state: string;
    country: string;
  }): Promise<Profile> {
    return this.prisma.profile.create({ data });
  }

  async update(id: number, updateProfileDto: Partial<Profile>): Promise<Profile> {
    try {
      const updatedProfile = await this.prisma.profile.update({
        where: { id },
        data: updateProfileDto,
      });
      return updatedProfile;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Profile with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<Profile> {
    try {
      const deletedProfile = await this.prisma.profile.delete({
        where: { id },
      });
      return deletedProfile;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Profile with ID ${id} not found`);
      }
      throw error;
    }
  }
}
