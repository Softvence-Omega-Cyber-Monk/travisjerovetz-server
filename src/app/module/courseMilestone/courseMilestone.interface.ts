import { ILesson } from "../courseLesson/courseLesson.interface";

export interface IModule {
  courseId: string;
  moduleName: string;
  lessons: ILesson[];
  order: number;
}