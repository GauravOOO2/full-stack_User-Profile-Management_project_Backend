import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, InternalServerErrorException, ValidationPipe } from '@nestjs/common';
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
  async findOne(@Param('userId', ParseIntPipe) userId: number): Promise<Profile & { user: { username: string } }> {
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
  async create(@Body(new ValidationPipe()) createProfileDto: CreateProfileDto): Promise<Profile & { user: { username: string } }> {
    try {
      return await this.profilesService.createOrUpdateProfile(createProfileDto);
    } catch (error) {
      console.error('Error creating profile:', error);
      throw new InternalServerErrorException('Failed to create profile');
    }
  }

  @Patch(':userId')
  async updateProfile(
    @Param('userId') userId: string,
    @Body() updateProfileDto: UpdateProfileDto
  ) {
    return await this.profilesService.updateProfileByUserId(+userId, updateProfileDto);
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
