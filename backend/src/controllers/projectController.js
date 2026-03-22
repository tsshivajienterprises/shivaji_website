import prisma from '../config/database.js';
import { asyncHandler } from '../utils/helpers.js';
import { generateSlug } from '../utils/helpers.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/uploadService.js';

export const getAllProjects = asyncHandler(async (req, res) => {
  const { category, featured, page = 1, limit = 10 } = req.query;

  const where = {};
  if (category) where.category = category;
  if (featured === 'true') where.isFeatured = true;

  const skip = (page - 1) * limit;

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
      skip,
      take: parseInt(limit),
    }),
    prisma.project.count({ where }),
  ]);

  res.json({
    projects,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    },
  });
});

export const getFeaturedProjects = asyncHandler(async (req, res) => {
  const projects = await prisma.project.findMany({
    where: { isFeatured: true },
    orderBy: { displayOrder: 'asc' },
    take: 6,
  });

  res.json({ projects });
});

export const getProjectBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      galleryItems: {
        where: { isActive: true },
        orderBy: { displayOrder: 'asc' },
      },
    },
  });

  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  res.json({ project });
});

export const createProject = asyncHandler(async (req, res) => {
  const { title, category, shortDescription, fullDescription, location, isFeatured, displayOrder } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'Cover image is required' });
  }

  const uploadResult = await uploadToCloudinary(req.file, 'projects');
  const slug = generateSlug(title);

  const project = await prisma.project.create({
    data: {
      title,
      slug,
      category,
      shortDescription,
      fullDescription,
      location,
      coverImageUrl: uploadResult.secure_url,
      isFeatured: isFeatured || false,
      displayOrder: displayOrder || 0,
    },
  });

  res.status(201).json({ message: 'Project created', project });
});

export const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, category, shortDescription, fullDescription, location, isFeatured, displayOrder } = req.body;

  const updateData = {
    title,
    category,
    shortDescription,
    fullDescription,
    location,
    isFeatured,
    displayOrder,
  };

  if (title) {
    updateData.slug = generateSlug(title);
  }

  if (req.file) {
    const uploadResult = await uploadToCloudinary(req.file, 'projects');
    updateData.coverImageUrl = uploadResult.secure_url;
  }

  const project = await prisma.project.update({
    where: { id },
    data: updateData,
  });

  res.json({ message: 'Project updated', project });
});

export const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await prisma.project.delete({ where: { id } });

  res.json({ message: 'Project deleted' });
});
