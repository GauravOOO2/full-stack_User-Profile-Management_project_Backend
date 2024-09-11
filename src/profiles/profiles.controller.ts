import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { Profile } from '@prisma/client';

@Controller('api/profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  async findAll(): Promise<Profile[]> {
    return this.profilesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Profile> {
    try {
      return await this.profilesService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error in findOne:', error);
      throw new InternalServerErrorException('An unexpected error occurred while fetching the profile');
    }
  }

  @Post()
  async create(@Body() createProfileDto: {
    userId: number;
    email: string;
    gender: string;
    address: string;
    pincode: string;
    city: string;
    state: string;
    country: string;
  }): Promise<Profile> {
    return this.profilesService.create(createProfileDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: Partial<Profile>
  ): Promise<Profile> {
    try {
      return await this.profilesService.update(id, updateProfileDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error in update:', error);
      throw new InternalServerErrorException('An unexpected error occurred while updating the profile');
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Profile> {
    try {
      return await this.profilesService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error in remove:', error);
      throw new InternalServerErrorException('An unexpected error occurred while deleting the profile');
    }
  }
}
