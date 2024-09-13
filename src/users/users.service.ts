import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Profile } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

// Or define Profile as an interface if it's not imported
// interface Profile {
//   // Define the structure of Profile here
// }

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User & { profile?: Profile }> {
    const userData = await this.prisma.user.findUnique({
      where: { id },
      include: { profile: true }, // Include the related Profile data
    });

    if (!userData) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return userData; // This will include the profile data
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        profile: { // Change 'Profile' to 'profile'
          create: {
            email: '', // You might want to add these fields to your user creation form
            gender: '',
            address: '',
            pincode: '',
            city: '',
            state: '',
            country: ''
          }
        },
      },
      include: { profile: true }, // Include the related profile data
    });
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    try {
      const { profile, ...userData } = data as { profile?: any } & Partial<{ id: number; username: string; phone: string; }>;
      
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          ...userData,
          profile: profile ? {
            update: {
              email: profile.email,
              gender: profile.gender,
              address: profile.address,
              pincode: profile.pincode,
              city: profile.city,
              state: profile.state,
              country: profile.country,
            }
          } : undefined
        },
        include: { profile: true }
      });

      return updatedUser;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<User> {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
      });
      return user;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      if (error.code === 'P2003') {
        throw new ConflictException(`Cannot delete user with ID ${id}. It may have related records.`);
      }
      throw error;
    }
  }
}
