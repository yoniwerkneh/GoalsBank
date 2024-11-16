import User from '../models/User.js';
import Account from '../models/Account.js';
import Transaction from '../models/Transaction.js';
import { v4 as uuidv4 } from 'uuid';

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
];

const seedAccounts = [
  {
    type: 'CHECKING',
    name: 'Main Checking',
    balance: 5000.00,
    currency: 'USD',
  },
  {
    type: 'SAVINGS',
    name: 'Emergency Fund',
    balance: 10000.00,
    currency: 'USD',
  },
];

const seedTransactions = [
  {
    type: 'DEPOSIT',
    amount: 1000.00,
    description: 'Salary deposit',
    category: 'INCOME',
    date: new Date(),
    status: 'COMPLETED',
  },
  {
    type: 'WITHDRAWAL',
    amount: 50.00,
    description: 'Grocery shopping',
    category: 'FOOD',
    date: new Date(),
    status: 'COMPLETED',
  },
];

export async function seedDatabase() {
  try {
    // First, sync all models in the correct order
    await User.sync({ force: true });
    await Account.sync({ force: true });
    await Transaction.sync({ force: true });

    // Create users first
    const users = await Promise.all(
      seedUsers.map(userData => User.create(userData))
    );
    console.log('Users seeded successfully');

    // Then create accounts for each user
    for (const user of users) {
      const userAccounts = await Promise.all(
        seedAccounts.map(accountData => 
          Account.create({
            ...accountData,
            userId: user.id,
          })
        )
      );
      console.log(`Accounts created for user ${user.username}`);

      // Finally create transactions for each account
      for (const account of userAccounts) {
        await Promise.all(
          seedTransactions.map(transactionData =>
            Transaction.create({
              ...transactionData,
              accountId: account.id,
            })
          )
        );
      }
      console.log(`Transactions created for user ${user.username}`);
    }

    console.log('\nDatabase seeded successfully!');
    console.log('\nTest Accounts:');
    console.log('-------------------');
    seedUsers.forEach(user => {
      console.log(`\nUsername: ${user.username}`);
      console.log(`Password: ${user.password}`);
      console.log(`Roles: ${user.roles.join(', ')}`);
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}