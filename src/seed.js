import mongoose from 'mongoose';
import dotenv from 'dotenv';
import * as PracticeModels from './models/Practice.js';
import * as CodingModels from './models/CodingProblem.js';
import * as RoadmapModels from './models/RoadMap.js';

dotenv.config();

// Resolve both default and named export variations safely
const Question = PracticeModels.default || PracticeModels.Question || PracticeModels.Practice;
const CodingProblem = CodingModels.default || CodingModels.CodingProblem;
const Roadmap = RoadmapModels.default || RoadmapModels.Roadmap || RoadmapModels.RoadMap;

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for Seeding...');

    // Clear previous collections
    if (Question) await Question.deleteMany({});
    if (CodingProblem) await CodingProblem.deleteMany({});
    if (Roadmap) await Roadmap.deleteMany({});

    // 1. Practice MCQs
    if (Question) {
      await Question.insertMany([
        {
          category: 'OOP',
          difficulty: 'Easy',
          questionText: 'Which concept allows code reusability in OOP?',
          options: ['Encapsulation', 'Inheritance', 'Abstraction', 'Polymorphism'],
          correctOption: 1,
          explanation: 'Inheritance allows a derived class to inherit features of a base class.'
        },
        {
          category: 'DBMS',
          difficulty: 'Medium',
          questionText: 'Which normal form eliminates transitive functional dependencies?',
          options: ['1NF', '2NF', '3NF', 'BCNF'],
          correctOption: 2,
          explanation: '3NF requires that all transitive dependencies are removed.'
        },
        {
          category: 'OS',
          difficulty: 'Easy',
          questionText: 'Which of the following is NOT an actual process state?',
          options: ['Running', 'Waiting', 'Terminated', 'Compiled'],
          correctOption: 3,
          explanation: 'Compiled is a build-time phase, not a runtime OS process state.'
        },
        {
          category: 'DSA',
          difficulty: 'Medium',
          questionText: 'What is the average time complexity of searching in a Balanced BST?',
          options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
          correctOption: 2,
          explanation: 'Balanced BST search operation takes logarithmic time O(log n).'
        }
      ]);
    }

    // 2. Coding Problems
    if (CodingProblem) {
      await CodingProblem.insertMany([
        {
          title: 'Two Sum',
          difficulty: 'Easy',
          description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
          examples: [{ input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] == 9' }],
          constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9']
        },
        {
          title: 'Valid Parentheses',
          difficulty: 'Easy',
          description: 'Given a string s containing just the characters (, ), {, }, [ and ], determine if the input string is valid.',
          examples: [{ input: 's = "()[]{}"', output: 'true', explanation: 'Brackets match correctly' }],
          constraints: ['1 <= s.length <= 10^4']
        }
      ]);
    }

    // 3. Roadmap Modules
    if (Roadmap) {
      await Roadmap.insertMany([
        {
          role: 'SDE / Full Stack',
          weekNumber: 1,
          title: 'Week 1: Core DSA & SQL Basics',
          tasks: [
            { title: 'Arrays & Two-Pointer Problems', topic: 'DSA' },
            { title: 'Basic SQL Queries (SELECT, GROUP BY)', topic: 'DBMS' }
          ]
        },
        {
          role: 'SDE / Full Stack',
          weekNumber: 2,
          title: 'Week 2: Linked Lists & Core OOP',
          tasks: [
            { title: 'Singly & Doubly Linked List Operations', topic: 'DSA' },
            { title: 'OOP 4 Pillars & Virtual Functions', topic: 'OOP' }
          ]
        }
      ]);
    }

    console.log('✅ Seed Data Inserted Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedData();