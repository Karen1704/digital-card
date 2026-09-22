import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Profile } from './models/profile.model.js';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(): Promise<Profile> {
    const profile = await this.prisma.profile.findFirst({
      include: {
        skills: true,
        experience: true,
        projects: true,
      },
    });

    if (!profile) {
      throw new NotFoundException('Profile data has not been seeded yet.');
    }

    return profile;
  }
}
