import prisma from '../config/database.js';
import { asyncHandler } from '../utils/helpers.js';
import { sendEnquiryNotification } from '../services/emailService.js';

export const createEnquiry = asyncHandler(async (req, res) => {
  const { name, phone, email, serviceInterest, message } = req.body;

  const enquiry = await prisma.enquiry.create({
    data: {
      name,
      phone,
      email,
      serviceInterest,
      message,
      status: 'new',
      source: 'website',
    },
  });

  // Send email notification (non-blocking)
  sendEnquiryNotification(enquiry).catch((err) =>
    console.error('Email notification failed:', err)
  );

  res.status(201).json({
    message: 'Enquiry submitted successfully',
    enquiry: {
      id: enquiry.id,
      name: enquiry.name,
      createdAt: enquiry.createdAt,
    },
  });
});

export const getAllEnquiries = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;

  const where = status ? { status } : {};
  const skip = (page - 1) * limit;

  const [enquiries, total] = await Promise.all([
    prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: parseInt(limit),
    }),
    prisma.enquiry.count({ where }),
  ]);

  res.json({
    enquiries,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    },
  });
});

export const updateEnquiryStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const enquiry = await prisma.enquiry.update({
    where: { id },
    data: { status },
  });

  res.json({ message: 'Enquiry updated', enquiry });
});
