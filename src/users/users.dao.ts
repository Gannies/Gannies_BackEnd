import { Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dto';
import { EMembershipStatus } from './enums';
import { ESearchUser } from 'src/admin/enums';

@Injectable()
export class UsersDAO {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  // 회원 엔티티 생성
  async createUser(createUserDto: CreateUserDto): Promise<UsersEntity> {
    const newUser = new UsersEntity();
    Object.assign(newUser, createUserDto);
    return newUser;
  }

  // 회원 최신 정보 Repository에 저장하기
  async saveUser(user: UsersEntity): Promise<UsersEntity> {
    return this.usersRepository.save(user);
  }

  // 이메일로 회원 찾기
  async findUserByNickname(nickname: string): Promise<UsersEntity | undefined> {
    return this.usersRepository.findOne({ where: { nickname } });
  }

  // 이메일로 회원 찾기
  async findUserByEmail(email: string): Promise<UsersEntity | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // 회원 ID로 회원 찾기
  async findUserByUserId(userId: number): Promise<UsersEntity | undefined> {
    return this.usersRepository.findOne({ where: { userId } });
  }

  // 회원 ID로 회원 찾기 (탈퇴한 회원도 조회됨)
  async findUserByUserIdForAdmin(userId: number): Promise<UsersEntity | undefined> {
    return this.usersRepository.findOne({ where: { userId }, withDeleted: true });
  }

  // 회원 ID로 회원 닉네임 찾기
  async findUserNicknameByUserId(userId: number): Promise<string | undefined> {
    const user = await this.usersRepository.findOne({ where: { userId } });
    return user.nickname;
  }

  // 회원 실명과 휴대폰 번호로 회원 찾기
  async findUserByUsernameAndPhone(username: string, phoneNumber: string): Promise<UsersEntity | undefined> {
    return this.usersRepository.findOne({ where: { username, phoneNumber } });
  }

  // 회원 실명과 이메일로 회원 찾기
  async findUserByUsernameAndEmail(username: string, email: string): Promise<UsersEntity | undefined> {
    return this.usersRepository.findOne({ where: { username, email } });
  }

  // 닉네임 중복여부 확인
  async checkNicknameExists(nickname: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { nickname } });
    return !!user;
  }

  // 페이지네이션 회원 조회
  async findUsersWithDetails(
    page: number = 1,
    limit: number = 10,
    type?: ESearchUser,
    search?: string,
  ): Promise<[any[], number]> {
    const queryBuilder = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'posts')
      .leftJoinAndSelect('user.comments', 'comments')
      .select([
        'user.userId', // 회원 ID (렌터링 X)
        'user.nickname', // 닉네임
        'user.email', // 이메일
        'COUNT(posts.postId) AS postCount', // 게시물 수
        'COUNT(comments.commentId) AS commentCount', // 댓글 수
        'user.createdAt', // 가입날짜
      ])
      .withDeleted() // 탈퇴한 회원도 포함
      .groupBy('user.userId')
      .orderBy('user.userId', 'DESC') // 1) userId 기준 내림차순
      .addOrderBy('user.createdAt', 'DESC'); // 2) 가입일 기준 내림차순 (userId가 같은 경우)

    // 검색어가 있을 경우
    if (type && search) {
      switch (type) {
        case ESearchUser.USER_ID:
          queryBuilder.andWhere('user.userId = :search', { search });
          break;
        case ESearchUser.NICKNAME:
          queryBuilder.andWhere('user.nickname LIKE :search', { search: `%${search}%` });
          break;
        case ESearchUser.EMAIL:
          queryBuilder.andWhere('user.email LIKE :search', { search: `%${search}%` });
          break;
      }
    }

    const allUsers = await queryBuilder.getRawMany();
    const total = allUsers.length;

    // 페이지네이션 적용
    const startIndex = (page - 1) * limit;
    const paginatedUsers = allUsers.slice(startIndex, startIndex + limit);

    return [paginatedUsers, total];
  }

  // 전체 사용자 수 계산
  async countTotalUsers(): Promise<number> {
    const result = await this.usersRepository
      .createQueryBuilder('user')
      .select('COUNT(user.userId)', 'total')
      .getRawOne();
    return Number(result.total);
  }

  // 승인 대기중인 회원 조회
  async findPendingAndRejectVerifications(page: number, limit: number = 10): Promise<[UsersEntity[], number]> {
    const [users, total] = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.deletedAt IS NULL')
      .andWhere('user.membershipStatus = :status', { status: EMembershipStatus.EMAIL_VERIFIED })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('user.userId', 'DESC')
      .getManyAndCount();

    return [users, total];
  }
}
