import prisma from '../config/database.js';
import { asyncHandler } from '../utils/helpers.js';

export const incrementVisits = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const stats = await prisma.visitorStats.upsert({
    where: { date: today },
    update: { count: { increment: 1 } },
    create: { date: today, count: 1 },
  });

  res.json({ success: true, count: stats.count });
});

export const getDashboardStats = asyncHandler(async (req, res) => {
  // Get total visits
  const aggregate = await prisma.visitorStats.aggregate({
    _sum: {
      count: true,
    },
  });

  const totalVisits = aggregate._sum.count || 0;

  // Get other counts
  const [enquiryTotal, callbackTotal, projectTotal] = await Promise.all([
    prisma.enquiry.count(),
    prisma.callbackRequest.count({ where: { status: 'pending' } }),
    prisma.project.count(),
  ]);

  res.json({
    visits: totalVisits,
    enquiries: enquiryTotal,
    callbacks: callbackTotal,
    projects: projectTotal,
  });
});
