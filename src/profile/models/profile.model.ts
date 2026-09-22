import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Experience } from './experience.model.js';
import { Project } from './project.model.js';
import { Skill } from './skill.model.js';

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => String, { nullable: true })
  githubUrl: string | null;

  @Field(() => String, { nullable: true })
  linkedinUrl: string | null;

  @Field(() => [Skill])
  skills: Skill[];

  @Field(() => [Experience])
  experience: Experience[];

  @Field(() => [Project])
  projects: Project[];
}
