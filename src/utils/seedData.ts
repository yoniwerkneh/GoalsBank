import User from '../models/User.js';
import sequelize from '../config/database.js';

const seedUsers = [
  {
    username: 'admin',
    password: 'Admin@123',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    phoneNumber: '+1234567890',
    roles: ['ADMIN', 'USER'],
  },
  {
    username: 'john.doe',
    password: 'JohnDoe@123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1987654321',
    roles: ['USER'],
  },
  {
    username: 'jane.smith',
    password: 'JaneSmith@123',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phoneNumber: '+1122334455',
    roles: ['USER'],
  },
  {
    username: 'manager',
    password: 'Manager@123',
    firstName: 'Project',
    lastName: 'Manager',
    email: 'manager@example.com',
    phoneNumber: '+1555666777',
    roles: ['MANAGER', 'USER'],
  },
];

export async function seedDatabase() {
  try {
    // Sync database
    await sequelize.sync({ force: true }); // This will drop existing tables
    
    // Create users
    await Promise.all(seedUsers.map(user => User.create(user)));
    
    console.log('Database seeded successfully!');
    console.log('\nTest Accounts:');
    console.log('-------------------');
    seedUsers.forEach(user => {
      console.log(`\nUsername: ${user.username}`);
      console.log(`Password: ${user.password}`);
      console.log(`Roles: ${user.roles.join(', ')}`);
    });
    
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}