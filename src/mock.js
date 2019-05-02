import Mock from 'mockjs';

Mock.mock('http://localhost:3000', () => 'Hello Mock!');
