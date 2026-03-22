import { sendEmail } from '../config/email.js';

export const sendEnquiryNotification = async (enquiry) => {
  const html = `
    <h2>New Enquiry Received</h2>
    <p><strong>Name:</strong> ${enquiry.name}</p>
    <p><strong>Phone:</strong> ${enquiry.phone}</p>
    <p><strong>Email:</strong> ${enquiry.email}</p>
    <p><strong>Service Interest:</strong> ${enquiry.serviceInterest || 'N/A'}</p>
    <p><strong>Message:</strong></p>
    <p>${enquiry.message}</p>
    <hr>
    <p><small>Received at: ${new Date(enquiry.createdAt).toLocaleString()}</small></p>
  `;

  return await sendEmail({
    to: process.env.COMPANY_EMAIL,
    subject: `New Enquiry from ${enquiry.name}`,
    html,
  });
};

export const sendCallbackNotification = async (callback) => {
  const html = `
    <h2>New Callback Request</h2>
    <p><strong>Name:</strong> ${callback.name}</p>
    <p><strong>Phone:</strong> ${callback.phone}</p>
    <p><strong>Preferred Time:</strong> ${callback.preferredTime || 'N/A'}</p>
    <p><strong>Notes:</strong> ${callback.notes || 'N/A'}</p>
    <hr>
    <p><small>Received at: ${new Date(callback.createdAt).toLocaleString()}</small></p>
  `;

  return await sendEmail({
    to: process.env.COMPANY_EMAIL,
    subject: `Callback Request from ${callback.name}`,
    html,
  });
};
