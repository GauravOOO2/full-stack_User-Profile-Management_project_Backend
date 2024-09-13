import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, Profile } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User & { profile?: Profile }> {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error in findOne:', error);
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: Partial<User>
  ): Promise<User> {
    try {
      return await this.usersService.update(id, updateUserDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error in update:', error);
      throw new InternalServerErrorException('An unexpected error occurred while updating the user');
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<User> {
    try {
      return await this.usersService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof ConflictException) {
        throw error;
      }
      console.error('Error in remove:', error);
      throw new InternalServerErrorException('An unexpected error occurred while deleting the user');
    }
  }
}
