import prisma from '../config/database.js';
import { asyncHandler } from '../utils/helpers.js';
import { sendCallbackNotification } from '../services/emailService.js';

export const createCallbackRequest = asyncHandler(async (req, res) => {
  const { name, phone, preferredTime, notes } = req.body;

  const callback = await prisma.callbackRequest.create({
    data: {
      name,
      phone,
      preferredTime,
      notes,
      status: 'pending',
    },
  });

  // Send email notification (non-blocking)
  sendCallbackNotification(callback).catch((err) =>
    console.error('Email notification failed:', err)
  );

  res.status(201).json({
    message: 'Callback request submitted successfully',
    callback: {
      id: callback.id,
      name: callback.name,
      createdAt: callback.createdAt,
    },
  });
});

export const getAllCallbacks = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;

  const where = status ? { status } : {};
  const skip = (page - 1) * limit;

  const [callbacks, total] = await Promise.all([
    prisma.callbackRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: parseInt(limit),
    }),
    prisma.callbackRequest.count({ where }),
  ]);

  res.json({
    callbacks,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    },
  });
});

export const updateCallbackStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const callback = await prisma.callbackRequest.update({
    where: { id },
    data: { status },
  });

  res.json({ message: 'Callback request updated', callback });
});
