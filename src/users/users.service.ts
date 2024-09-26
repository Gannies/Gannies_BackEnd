import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { IUserWithoutPassword } from 'src/auth/interfaces';
import { UpdateNicknameDto, UpdatePasswordDto } from './dto';
import { AuthPasswordService, AuthSessionService, AuthSignInService } from 'src/auth/services';
import { UsersDAO } from './users.dao';
import { CommentsDAO } from 'src/comments/comments.dao';
import { PostsDAO } from 'src/posts/posts.dao';
import { OcrService } from 'src/orc/ocr.service';
import { Request } from 'express';
import { ScrapsDAO } from 'src/scraps/scraps.dao';
import { RepliesDAO } from 'src/replies/replies.dao';
import { ICombinedResult } from './interfaces/combined-result.interface';
import { ECommentType } from './enums';
import { IPaginatedResponse } from 'src/common/interfaces';
import { IUserInfoResponse } from './interfaces';
import { PostsEntity } from 'src/posts/entities/base-posts.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly authPasswordService: AuthPasswordService,
    private readonly usersDAO: UsersDAO,
    private readonly postsDAO: PostsDAO,
    private readonly scrapsDAO: ScrapsDAO,
    private readonly commentsDAO: CommentsDAO,
    private readonly repliesDAO: RepliesDAO,
    private readonly ocrService: OcrService,
    private readonly authSessionService: AuthSessionService,
    private readonly authSignInService: AuthSignInService,
  ) {}

  // 나의 정보 조회
  async fetchMyInfo(sessionUser: IUserWithoutPassword): Promise<IUserInfoResponse> {
    const { nickname, email, username, phoneNumber } = sessionUser;
    return { nickname, email, username, phoneNumber };
  }

  // 나의 닉네임 수정
  async updateMyNickname(
    sessionUser: IUserWithoutPassword,
    updateNicknameDto: UpdateNicknameDto,
    req: Request,
  ): Promise<{ message: string; newNickname: string }> {
    const { userId } = sessionUser;
    const { newNickname } = updateNicknameDto;

    const user = await this.usersDAO.findUserByUserId(userId);

    if (!user) {
      throw new NotFoundException('해당 회원이 존재하지 않습니다.');
    }

    // 닉네임 중복 여부 확인
    const nicknameExists = await this.usersDAO.checkNicknameExists(newNickname);
    if (nicknameExists) {
      throw new ConflictException('이미 사용 중인 닉네임입니다.');
    }

    // 닉네임 업데이트
    user.nickname = newNickname;
    const updatedUser = await this.usersDAO.saveUser(user);

    // 세션 정보 업데이트
    await this.authSessionService.updateSessionInfo(req, userId, updatedUser);
    return { message: '닉네임이 수정되었습니다.', newNickname };
  }

  // 나의 비밀번호 수정
  async updateMyPassword(userId: number, updatePasswordDto: UpdatePasswordDto): Promise<{ message: string }> {
    const { oldPassword, newPassword } = updatePasswordDto;
    const isTempPasswordSignIn = await this.authSignInService.checkTempPasswordSignIn(userId);

    const user = await this.usersDAO.findUserByUserId(userId);

    if (!user) {
      throw new NotFoundException('해당 회원이 존재하지 않습니다.');
    }

    const isOldPasswordValid = await this.authPasswordService.matchPassword(oldPassword, user.password);

    if (!isOldPasswordValid) {
      throw new BadRequestException('현재 비밀번호가 저장된 비밀번호와 일치하지 않습니다.');
    }

    if (oldPassword === newPassword) {
      throw new BadRequestException('현재 비밀번호와 새 비밀번호는 서로 달라야 합니다.');
    }

    const newHashedPassword = await this.authPasswordService.createHashedPassword(newPassword);
    user.password = newHashedPassword;

    if (isTempPasswordSignIn) {
      user.tempPasswordIssuedDate = null;
    }

    await this.usersDAO.saveUser(user);

    return { message: '비밀번호가 수정되었습니다.' };
  }

  // 나의 게시글 조회
  async fetchMyPosts(
    sessionUser: IUserWithoutPassword,
    page: number,
    limit: number,
    sort: 'latest' | 'popular',
  ): Promise<IPaginatedResponse<PostsEntity>> {
    const { userId } = sessionUser;
    const user = await this.usersDAO.findUserByUserId(userId);
    if (!user) {
      throw new NotFoundException('해당 회원이 존재하지 않습니다.');
    }
    return this.postsDAO.findMyPosts(sessionUser.userId, page, limit, sort);
  }

  // 나의 댓글 및 답글 조회
  async fetchMyCommentsAndReplies(
    userId: number,
    page: number,
    limit: number,
    sort: 'latest' | 'popular',
  ): Promise<IPaginatedResponse<any>> {
    const skip = (page - 1) * limit;

    // 댓글과 답글 조회
    const [comments, commentsCount] = await this.commentsDAO.findCommentsByUserIdWithPagination(userId, 0, 0);
    const [replies, repliesCount] = await this.repliesDAO.findRepliesByUserIdWithPagination(userId, 0, 0);

    const postIds = [
      ...new Set(comments.map((comment) => comment.postId).concat(replies.map((reply) => reply.commentId))),
    ];
    const posts = await this.postsDAO.findPostsByIds(postIds);
    const allPostsToFind = await this.postsDAO.findAllPostsWithoutConditions();
    const combinedResults: ICombinedResult[] = [];

    // 댓글 결과 조합
    comments.forEach((comment) => {
      const post = posts.find((post) => post.postId === comment.postId);
      combinedResults.push({
        type: ECommentType.COMMENT,
        commentId: comment.commentId,
        content: comment.content,
        createdAt: comment.createdAt,
        postId: comment.postId,
        boardType: post?.boardType,
        title: post?.title,
      });
    });

    // 답글 결과 조합
    for (const reply of replies) {
      const originalComment = await this.commentsDAO.findCommentByIdWithDeletedComment(reply.commentId);

      if (originalComment) {
        const post = allPostsToFind.find((post) => post.postId === originalComment?.postId);
        combinedResults.push({
          type: ECommentType.REPLY,
          replyId: reply.replyId,
          commentId: reply.commentId,
          content: reply.content,
          createdAt: reply.createdAt,
          postId: originalComment?.postId,
          boardType: post?.boardType || '정보없음',
          title: post?.title || '정보없음',
        });
      } else {
        console.log(`부모 댓글이 없습니다: ${reply.commentId}`);
      }
    }

    // 최신순 정렬 (기본)
    combinedResults.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // 인기순 정렬
    // 댓글 혹은 답글이 달린 원 게시물의 좋아요수가 많은 순서대로 정렬이 됨.
    if (sort === 'popular') {
      combinedResults.sort((a, b) => {
        const aPost = posts.find((post) => post.postId === (a.type === 'comment' ? a.postId : a.commentId));
        const bPost = posts.find((post) => post.postId === (b.type === 'comment' ? b.postId : b.commentId));
        return (bPost?.likeCounts || 0) - (aPost?.likeCounts || 0);
      });
    }

    // 전체 결과에 대해 페이지네이션 적용
    const paginatedResults = combinedResults.slice(skip, skip + limit);

    return {
      items: paginatedResults,
      totalItems: commentsCount + repliesCount,
      totalPages: Math.ceil((commentsCount + repliesCount) / limit),
      currentPage: page,
    };
  }

  // 나의 스크랩한 게시물 조회
  async fetchMyScrapedPosts(
    sessionUser: IUserWithoutPassword,
    page: number,
    limit: number,
    sort: 'latest' | 'popular',
  ): Promise<IPaginatedResponse<any>> {
    const { userId } = sessionUser;
    const user = await this.usersDAO.findUserByUserId(userId);
    if (!user) {
      throw new NotFoundException('해당 회원이 존재하지 않습니다.');
    }
    const scrapedPosts = await this.scrapsDAO.findMyScraps(userId, page, limit, sort);
    const formattedPosts = scrapedPosts.items.map((scrap) => ({
      scrapId: scrap.scrapId, // 스크랩 ID
      postId: scrap.post.postId, // 게시물 ID
      boardType: scrap.post.boardType, // 게시판 카테고리
      title: scrap.post.title, // 제목
      viewCounts: scrap.post.viewCounts, // 조회수
      likeCounts: scrap.post.likeCounts, // 좋아요수
      createdAt: scrap.post.createdAt, // 작성일
    }));

    return {
      items: formattedPosts,
      totalItems: scrapedPosts.totalItems,
      totalPages: scrapedPosts.totalPages,
      currentPage: scrapedPosts.currentPage,
    };
  }

  // 회원 인증서류 URL에서 실명 추출
  async extractUserName(userId: number): Promise<string> {
    const user = await this.usersDAO.findUserByUserId(userId);
    if (!user) throw new NotFoundException('해당 회원이 존재하지 않습니다.');

    const certificationUrl = user.certificationDocumentUrl;
    if (!certificationUrl) throw new NotFoundException('해당 회원의 인증서류 URL을 찾을 수 없습니다.');

    const extractedUserName = await this.ocrService.detextTextFromImage(certificationUrl);

    user.username = extractedUserName;
    await this.usersDAO.saveUser(user);

    return extractedUserName;
  }

  // 회원가입시 닉네임 중복여부 확인
  async isNicknameAvailable(nickname: string): Promise<boolean> {
    const user = await this.usersDAO.checkNicknameExists(nickname);
    return !user;
  }

  // 회원가입시 이메일 중복여부 확인
  async isEmailAvailable(email: string): Promise<boolean> {
    const user = await this.usersDAO.findUserByEmail(email);
    return !user;
  }
}
