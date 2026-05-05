const paymentSuccessEmail = (firstName, courseNames, amount) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #4CAF50;">Payment Successful!</h2>
      <p>Dear ${firstName},</p>
      <p>Thank you for your purchase! We have received your payment of <strong>$${amount}</strong> for the following course(s):</p>
      <ul>      ${courseNames.map(course => `<li>${course}</li>`).join('')}
      </ul>
    </div>
  `;
};

module.exports = paymentSuccessEmail;