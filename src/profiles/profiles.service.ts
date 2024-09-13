import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
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

  async findOne(id: number): Promise<Profile> {
    const profile = await this.prisma.profile.findUnique({
      where: { id },
    });

    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    return profile;
  }

  async createProfile(createProfileDto: CreateProfileDto) {
    // Check if a profile already exists for this user
    const existingProfile = await this.prisma.profile.findUnique({
      where: { id: createProfileDto.userId },
    });

    if (existingProfile) {
      throw new ConflictException('Profile already exists for this user');
    } else {
      return this.prisma.profile.create({
        data: {
          email: createProfileDto.email,
          gender: createProfileDto.gender,
          address: createProfileDto.address,
          pincode: createProfileDto.pincode,
          city: createProfileDto.city,
          state: createProfileDto.state,
          country: createProfileDto.country,
          user: {
            connect: { id: createProfileDto.userId }
          }
        },
      });
    }
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    return this.prisma.profile.update({
      where: { id },
      data: {
        email: updateProfileDto.email,
        gender: updateProfileDto.gender,
        address: updateProfileDto.address,
        pincode: updateProfileDto.pincode,
        city: updateProfileDto.city,
        state: updateProfileDto.state,
        country: updateProfileDto.country,
      }
    });
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
