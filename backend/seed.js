const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();
    
    const User = require('./models/User');
    
    // Check if users already exist
    const existingUser = await User.findOne({ email: 'admin@fleet.com' });
    
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('admin@123', 10);
      
      const testUsers = [
        {
          name: 'Admin User',
          email: 'admin@fleet.com',
          password: hashedPassword,
          role: 'admin'
        }
      ];
      
      await User.insertMany(testUsers);
      console.log('✅ Test user created successfully!');
      console.log('   Email: admin@fleet.com');
      console.log('   Password: admin@123');
    } else {
      console.log('✅ Users already exist in database');
    }
    
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
