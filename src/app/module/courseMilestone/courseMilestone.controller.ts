// export const courseController = {
//   async createCourse(req: Request, res: Response) {
//     try {
//       // Get SCORM, video, audio, PDF, and image file URLs from Cloudinary
//       const scormUrl = req.files?.['scorm']?.[0]?.path || '';
//       const videoUrl = req.files?.['video']?.[0]?.path || '';
//       const audioUrl = req.files?.['audio']?.[0]?.path || '';
//       const pdfUrl = req.files?.['pdf']?.[0]?.path || '';
//       const thumbnailUrl = req.files?.['thumbnail']?.[0]?.path || '';

//       // Continue with course creation logic here (e.g., storing the URLs in a database)
//       res.status(200).json({
//         message: 'Course created successfully!',
//         files: { scormUrl, videoUrl, audioUrl, pdfUrl, thumbnailUrl },
//       });
//     } catch (error) {
//       res.status(500).json({ message: 'Failed to create course', error });
//     }
//   },
// };