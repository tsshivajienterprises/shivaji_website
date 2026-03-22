import prisma from '../config/database.js';
import { asyncHandler } from '../utils/helpers.js';

export const getPublicSettings = asyncHandler(async (req, res) => {
  const settings = await prisma.siteSetting.findMany({
    select: {
      settingKey: true,
      settingValue: true,
    },
  });

  const settingsObject = settings.reduce((acc, setting) => {
    acc[setting.settingKey] = setting.settingValue;
    return acc;
  }, {});

  res.json({ settings: settingsObject });
});

export const getAllSettings = asyncHandler(async (req, res) => {
  const settings = await prisma.siteSetting.findMany({
    orderBy: { settingKey: 'asc' },
  });

  res.json({ settings });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const { settings } = req.body;

  if (!Array.isArray(settings)) {
    return res.status(400).json({ error: 'Settings must be an array' });
  }

  const updatePromises = settings.map((setting) =>
    prisma.siteSetting.upsert({
      where: { settingKey: setting.settingKey },
      update: { settingValue: setting.settingValue },
      create: {
        settingKey: setting.settingKey,
        settingValue: setting.settingValue,
      },
    })
  );

  await Promise.all(updatePromises);

  res.json({ message: 'Settings updated successfully' });
});
