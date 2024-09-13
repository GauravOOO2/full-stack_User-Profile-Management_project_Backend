import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { Profile } from '@prisma/client';
import { CreateProfileDto } from '../users/dto/create-profile.dto';
import { UpdateProfileDto } from '../users/dto/update-profile.dto';

@Controller('api/profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  async findAll(): Promise<Profile[]> {
    return this.profilesService.findAll();
  }

  @Get(':userId')
  async findOne(@Param('userId', ParseIntPipe) userId: number): Promise<Profile> {
    try {
      return await this.profilesService.findOneByUserId(userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error in findOne:', error);
      throw new InternalServerErrorException('An unexpected error occurred while fetching the profile');
    }
  }

  @Post()
  async create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profilesService.createOrUpdateProfile(createProfileDto);
  }

  @Patch(':userId')
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateProfileDto: UpdateProfileDto
  ): Promise<Profile> {
    try {
      return await this.profilesService.updateProfileByUserId(userId, updateProfileDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error in update:', error);
      throw new InternalServerErrorException('An unexpected error occurred while updating the profile');
    }
  }

  @Delete(':userId')
  async remove(@Param('userId', ParseIntPipe) userId: number): Promise<Profile> {
    try {
      return await this.profilesService.removeByUserId(userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error in remove:', error);
      throw new InternalServerErrorException('An unexpected error occurred while deleting the profile');
    }
  }
}
