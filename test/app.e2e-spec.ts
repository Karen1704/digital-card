import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module.js';
import { PrismaService } from './../src/prisma/prisma.service.js';

const profile = {
  id: 'profile-1',
  name: 'Karen Ghalachyan',
  description:
    'Backend Software Engineer with 3+ years of experience specializing in Node.js, TypeScript, payment systems, APIs and database-driven applications.',
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

describe('Profile GraphQL API (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({
        profile: {
          findFirst: () => Promise.resolve(profile),
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('returns the digital card profile', async () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            profile {
              name
              description
              githubUrl
              linkedinUrl
              skills {
                name
              }
              experience {
                company
                position
                period
                achievements
              }
              projects {
                name
                url
                description
              }
            }
          }
        `,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.errors).toBeUndefined();
        expect(body.data.profile).toEqual({
          name: profile.name,
          description: profile.description,
          githubUrl: profile.githubUrl,
          linkedinUrl: profile.linkedinUrl,
          skills: [{ name: 'TypeScript' }],
          experience: [
            {
              company: 'Hydralab LLC',
              position: 'Software Engineer',
              period: 'Current',
              achievements: ['Built REST APIs using NestJS and Express.js.'],
            },
          ],
          projects: [
            {
              name: 'Payment Back-Office System',
              url: null,
              description: 'Backend system for managing payment operations.',
            },
          ],
        });
      });
  });

  afterEach(async () => {
    await app?.close();
  });
});
