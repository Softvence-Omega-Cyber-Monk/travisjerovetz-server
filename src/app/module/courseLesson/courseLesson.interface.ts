export interface ILesson {
  lessonName: string;
  contentType: 'Video/Image' | 'Audio' | 'Text/PDF' | 'Upload SCORM';
  contentUrl?: string;
  article?: string;
  duration?: number; // in minutes
  order: number;
  isCompleted?: boolean;
}