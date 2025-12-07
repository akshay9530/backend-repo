const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@ecommerce.com' });
    
    if (adminExists) {
      console.log('⚠️ Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@ecommerce.com',
      password: 'admin123', // Change this in production
      phone: '9999999999',
      role: 'admin'
    });

    console.log('✅ Admin user created successfully');
    console.log('📧 Email: admin@ecommerce.com');
    console.log('🔑 Password: admin123');
    console.log('⚠️ Please change the password immediately!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();