import prisma from '../config/database.js';
import { asyncHandler } from '../utils/helpers.js';
import { uploadToCloudinary } from '../services/uploadService.js';

export const getAllGalleryItems = asyncHandler(async (req, res) => {
  const { projectId, page = 1, limit = 20 } = req.query;

  const where = { isActive: true };
  if (projectId) where.projectId = projectId;

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.galleryItem.findMany({
      where,
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
      skip,
      take: parseInt(limit),
      include: {
        project: {
          select: { id: true, title: true, slug: true },
        },
      },
    }),
    prisma.galleryItem.count({ where }),
  ]);

  res.json({
    items,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    },
  });
});

export const createGalleryItem = asyncHandler(async (req, res) => {
  const { title, projectId, displayOrder, isActive } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'Image is required' });
  }

  const uploadResult = await uploadToCloudinary(req.file, 'gallery');

  const item = await prisma.galleryItem.create({
    data: {
      title,
      imageUrl: uploadResult.secure_url,
      projectId: projectId || null,
      displayOrder: displayOrder || 0,
      isActive: isActive !== undefined ? isActive : true,
    },
  });

  res.status(201).json({ message: 'Gallery item created', item });
});

export const updateGalleryItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, projectId, displayOrder, isActive } = req.body;

  const updateData = { title, projectId, displayOrder, isActive };

  if (req.file) {
    const uploadResult = await uploadToCloudinary(req.file, 'gallery');
    updateData.imageUrl = uploadResult.secure_url;
  }

  const item = await prisma.galleryItem.update({
    where: { id },
    data: updateData,
  });

  res.json({ message: 'Gallery item updated', item });
});

export const deleteGalleryItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await prisma.galleryItem.delete({ where: { id } });

  res.json({ message: 'Gallery item deleted' });
});
