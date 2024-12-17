import { Injectable, OnModuleDestroy } from '@nestjs/common';
import mongoose from 'mongoose';
import { User, UserSchema } from '../users/users.schema';
import { Task, TaskSchema } from '../tasks/tasks.schema';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class SeedService implements OnModuleDestroy {
  private connection: mongoose.Connection;

  constructor() {}

  async connectToDatabase() {
    if (!process.env.DB_URI) {
      console.error('❌ DB_URI is not defined in .env file.');
      process.exit(1);
    }

    console.log('🌱 Connecting to MongoDB...');
    this.connection = await mongoose.createConnection(process.env.DB_URI).asPromise();
    console.log('✅ Connected to MongoDB!');
  }

  async seedUsers() {
    const UserModel = this.connection.model('User', UserSchema);

    const existingUsers = await UserModel.find();
    

    const users = [
      { userId: 'USER-1234',tasks: [] },
      { userId: 'USER-5678', tasks: [] },
    ];

    await UserModel.insertMany(users);
    console.log('✅ Users seeded successfully.');
  }

  async seedTasks() {
    const TaskModel = this.connection.model('Task', TaskSchema);

    const existingTasks = await TaskModel.find();
    if (existingTasks.length > 0) {
      console.log('⚠️ Tasks already exist. Skipping task seeding.');
      return;
    }

    const tasks = [
        // Tasks for USER-1234
    {
        id: 'TASK-8782',
        userId: 'USER-1234',
        title: "Co len bro",
        status: 'in-progress',
        priority: 'medium',
        description: 'This task involves optimizing the SSD compression method.',
        dueTime: new Date('2024-12-17T09:00:00'),
        estimatedTime: 0,
        category: 'documentation',
        style: {
          backgroundColor: 'bg-blue-600',
          textColor: 'text-blue-600',
        },
        isOnCalendar: true,
      },
      {
        id: 'TASK-8213',
        userId: 'USER-1234',
        title: "Homework 03 is hard",
        status: 'in-progress',
        priority: 'medium',
        description: 'This task involves optimizing the SSD compression method.',
        dueTime: new Date('2024-12-17T09:00:00'),
        estimatedTime: 0,
        category: 'documentation',
        style: {
          backgroundColor: 'bg-green-600',
          textColor: 'text-green-600',
        },
      },
      {
        id: 'TASK-7878',
        userId: 'USER-1234',
        title: 'Try to calculate the EXE feed, maybe it will index the multi-byte pixel!',
        status: 'pending',
        category: 'documentation',
        priority: 'medium',
        description: 'Work on indexing the EXE feed with multi-byte pixel support.',
        dueTime: new Date('2024-12-17T11:30:00'),
        estimatedTime: 0,
        style: {
          backgroundColor: 'bg-purple-600',
          textColor: 'text-purple-600'
        }
      },
      {
        id: 'TASK-1280',
        userId: 'USER-1234',
        title: 'Use the digital TLS panel, then you can transmit the haptic system!',
        status: 'completed',
        category: 'bug',
        priority: 'high',
        description: 'Resolved bug related to digital TLS panel and haptic system transmission.',
        dueTime: new Date('2024-12-17T14:00:00'),
        estimatedTime: 0,
        isOnCalendar: false,
        style: {
          backgroundColor: 'bg-emerald-600',
          textColor: 'text-emerald-600'
        }
      },
      {
        id: 'TASK-7262',
        userId: 'USER-1234',
        title: 'The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!',
        status: 'pending',
        category: 'feature',
        priority: 'high',
        description: 'Fix UTF8 application down by parsing neural bandwidth for firewall support.',
        dueTime: new Date('2024-12-17T15:30:00'),
        estimatedTime: 0,
        isOnCalendar: false,
        style: {
          backgroundColor: 'bg-red-600',
          textColor: 'text-red-600'
        }
      },
      {
        id: 'TASK-7184',
        userId: 'USER-1234',
        title: 'We need to program the back-end THX pixel!',
        status: 'pending',
        category: 'feature',
        priority: 'low',
        description: 'Back-end programming for THX pixel required.',
        dueTime: new Date('2024-12-18T22:00:00'),
        estimatedTime: 4,
        style: {
          backgroundColor: 'bg-green-600',
          textColor: 'text-green-600'
        }
      },
    
      // Tasks for USER-5678
      {
        id: 'TASK-7839',
        userId: 'USER-5678',
        title: 'We need to bypass the neural TCP card!',
        status: 'pending',
        category: 'bug',
        priority: 'high',
        description: 'Fix the issue with the neural TCP card communication.',
        startDate: new Date('2024-12-16T07:00:00'),
        endDate: new Date('2024-12-16T12:00:00'),
        dueTime: new Date('2024-12-17T09:00:00Z'),
        estimatedTime: 5,
        style: {
          backgroundColor: 'bg-gradient-to-b from-white to-green-100',
          textColor: 'text-green-600'
        }
      },
      {
        id: 'TASK-5562',
        userId: 'USER-5678',
        title: 'The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!',
        status: 'pending',
        category: 'feature',
        priority: 'medium',
        description: 'Resolve issues with the SAS interface to ensure proper PNG bandwidth backup.',
        startDate: new Date('2024-02-05'),
        endDate: new Date('2024-02-15'),
        dueTime: new Date('2024-12-18T23:55:00Z'),
        estimatedTime: 25,
        style: {
          backgroundColor: 'bg-gradient-to-b from-white to-green-100',
          textColor: 'text-green-600'
        }
      },
      {
        id: 'TASK-8686',
        userId: 'USER-5678',
        title: "I'll parse the wireless SSL protocol, that should driver the API panel!",
        status: 'completed',
        category: 'feature',
        priority: 'medium',
        description: 'Attempted parsing of SSL protocols for API integration, but canceled due to incompatibility.',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-10'),
        dueTime: new Date('2024-12-20T15:30:00Z'),
        estimatedTime: 15,
        style: {
          backgroundColor: 'bg-gradient-to-b from-white to-green-100',
          textColor: 'text-green-600'
        }
      },
      {
        id: 'TASK-1138',
        userId: 'USER-5678',
        title: "Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwidth!",
        status: 'in-progress',
        category: 'feature',
        priority: 'medium',
        description: 'Currently quantifying 1080p SMTP bandwidth for driver development.',
        startDate: new Date('2024-01-20'),
        endDate: new Date('2024-02-01'),
        dueTime: new Date('2024-12-21T06:45:00Z'),
        estimatedTime: 50,
        style: {
          backgroundColor: 'bg-gradient-to-b from-white to-green-100',
          textColor: 'text-green-600'
        }
      },
      {
        id: 'TASK-5160',
        userId: 'USER-5678',
        title: "Calculating the bus won't do anything, we need to navigate the back-end JSON protocol!",
        status: 'in-progress',
        category: 'documentation',
        priority: 'high',
        description: 'Working on the back-end JSON protocol navigation and data handling.',
        startDate: new Date('2024-01-18'),
        endDate: new Date('2024-02-05'),
        dueTime: new Date('2024-12-17T09:00:00Z'),
        estimatedTime: 45,
        style: {
          backgroundColor: 'bg-gradient-to-b from-white to-green-100',
          textColor: 'text-green-600'
        }
      },
     
    ];

    await TaskModel.insertMany(tasks);
    console.log('✅ Tasks seeded successfully.');
  }

  async seedAll() {
    await this.connectToDatabase(); // Connect to the database first
    await this.seedUsers(); // Seed users
    await this.seedTasks(); // Seed tasks
    await this.connection.close();
    console.log('🌱 Seeding complete and database connection closed.');
  }

  async onModuleDestroy() {
    if (this.connection) {
      await this.connection.close();
      console.log('⚠️ MongoDB connection closed.');
    }
  }
}
