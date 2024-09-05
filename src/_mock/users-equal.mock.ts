import { mockUsers } from './users.mock';

export const mockUsersEqual = [
  {
    userId: 1,
    nickname: 'johndoe',
    email: 'john@example.com',
    postCount: 0,
    commentCount: 0,
    createdAt: mockUsers[0].createdAt,
    suspensionStatus: '정지',
    deletionStatus: '해당없음',
    managementReason: 'Violation of terms',
  },
  {
    userId: 2,
    nickname: 'janesmith',
    email: 'jane@example.com',
    postCount: 0,
    commentCount: 0,
    createdAt: mockUsers[1].createdAt,
    suspensionStatus: '해당없음',
    deletionStatus: '탈퇴',
    managementReason: 'Requested by user',
  },
  {
    userId: 3,
    nickname: 'alicecooper',
    email: 'alice@example.com',
    postCount: 0,
    commentCount: 0,
    createdAt: mockUsers[2].createdAt,
    suspensionStatus: '정지',
    deletionStatus: '해당없음',
    managementReason: 'Spam activity',
  },
  {
    userId: 4,
    nickname: 'bobdylan',
    email: 'bob@example.com',
    postCount: 0,
    commentCount: 0,
    createdAt: mockUsers[3].createdAt,
    suspensionStatus: '정지',
    deletionStatus: '해당없음',
    managementReason: '해당없음',
  },
  {
    userId: 5,
    nickname: 'charliebrown',
    email: 'charlie@example.com',
    postCount: 0,
    commentCount: 0,
    createdAt: mockUsers[4].createdAt,
    suspensionStatus: '정지',
    deletionStatus: '해당없음',
    managementReason: 'Inappropriate behavior',
  },
  {
    userId: 6,
    nickname: 'dianaprince',
    email: 'diana@example.com',
    postCount: 0,
    commentCount: 0,
    createdAt: mockUsers[5].createdAt,
    suspensionStatus: '해당없음',
    deletionStatus: '해당없음',
    managementReason: '해당없음',
  },
  {
    userId: 7,
    nickname: 'eveadams',
    email: 'eve@example.com',
    postCount: 0,
    commentCount: 0,
    createdAt: mockUsers[6].createdAt,
    suspensionStatus: '정지',
    deletionStatus: '해당없음',
    managementReason: 'Repeated offenses',
  },
  {
    userId: 8,
    nickname: 'frankcastle',
    email: 'frank@example.com',
    postCount: 0,
    commentCount: 0,
    createdAt: mockUsers[7].createdAt,
    suspensionStatus: '해당없음',
    deletionStatus: '해당없음',
    managementReason: '해당없음',
  },
];
