import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@tsshivaji.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: 'Admin',
      email: adminEmail,
      passwordHash: hashedPassword,
      role: 'admin',
      isActive: true,
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Create default site settings
  const settings = [
    { settingKey: 'company_name', settingValue: 'TS SHIVA JI ENTERPRISES PVT LTD' },
    { settingKey: 'company_email', settingValue: 'info@tsshivaji.com' },
    { settingKey: 'company_phone', settingValue: '+91 1234567890' },
    { settingKey: 'company_address', settingValue: 'Your Address Here' },
    { settingKey: 'about_text', settingValue: 'We are a leading construction company...' },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { settingKey: setting.settingKey },
      update: { settingValue: setting.settingValue },
      create: setting,
    });
  }

  console.log('✅ Site settings created');
  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
