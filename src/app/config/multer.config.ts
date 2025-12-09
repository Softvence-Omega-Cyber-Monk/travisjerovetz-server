import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinaryUpload } from './cloudinary.config';  // Cloudinary config
import multer from 'multer';
import { Request } from 'express';

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: async (req: Request, file: Express.Multer.File) => {
    const fileExtension = file.originalname.split('.').pop() || '';
    
    const baseFileName = file.originalname
      .replace(`.${fileExtension}`, '') 
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

    const uniqueId = `${Math.random().toString(36).substring(2)}-${Date.now()}-${baseFileName}`;

    let resourceType: 'image' | 'video' | 'audio' | 'raw' = 'image';

    if (file.mimetype === 'application/zip' || file.mimetype === 'application/pdf') {
      resourceType = 'raw'; // SCORM বা PDF ফাইল raw হিসেবে আপলোড হবে
    } else if (file.mimetype.startsWith('video/')) {
      resourceType = 'video'; // ভিডিও ফাইল ভিডিও হিসেবে আপলোড হবে
    } else if (file.mimetype.startsWith('audio/')) {
      resourceType = 'audio'; // অডিও ফাইল অডিও হিসেবে আপলোড হবে
    }

    return {
      folder: 'assets',   // Cloudinary তে 'assets' নামের ফোল্ডারে ফাইলগুলি যাবে
      public_id: uniqueId,
      resource_type: resourceType,
      format: fileExtension,
    };
  },
});

export const multerUpload = multer({ 
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit (optional)
  },
});
