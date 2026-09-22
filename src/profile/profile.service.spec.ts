import { NotFoundException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';
import { PrismaService } from '../prisma/prisma.service.js';
import { ProfileService } from './profile.service.js';

const profile = {
  id: 'profile-1',
  name: 'Karen Ghalachyan',
  description: 'Backend Software Engineer',
  githubUrl: 'https://github.com/Karen1704',
  linkedinUrl: 'https://www.linkedin.com/in/karen-ghalachyan-15057118a/',
  skills: [{ id: 'skill-1', name: 'TypeScript' }],
  experience: [
    {
      id: 'experience-1',
      company: 'Hydralab LLC',
      position: 'Software Engineer',
      period: 'Current',
      achievements: ['Built REST APIs using NestJS and Express.js.'],
    },
  ],
  projects: [
    {
      id: 'project-1',
      name: 'Payment Back-Office System',
      url: null,
      description: 'Backend system for managing payment operations.',
    },
  ],
};

function createService(findFirst = vi.fn()) {
  const prisma = {
    profile: {
      findFirst,
    },
  } as unknown as PrismaService;

  return new ProfileService(prisma);
}

describe('ProfileService', () => {
  it('returns profile with nested relations', async () => {
    const findFirst = vi.fn().mockResolvedValue(profile);
    const service = createService(findFirst);

    await expect(service.getProfile()).resolves.toEqual(profile);
    expect(findFirst).toHaveBeenCalledWith({
      include: {
        skills: true,
        experience: true,
        projects: true,
      },
    });
  });

  it('throws when profile data is missing', async () => {
    const service = createService(vi.fn().mockResolvedValue(null));

    await expect(service.getProfile()).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
