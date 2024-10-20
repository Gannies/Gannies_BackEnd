import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PostsDAO } from 'src/posts/posts.dao';
import { ScrapsDAO } from './scraps.dao';
import { ScrapsEntity } from './entities/scraps.entity';
import { PostsMetricsService } from 'src/posts/metrics/posts-metrics.service';
import { IUser } from 'src/auth/interfaces';

@Injectable()
export class ScrapService {
  constructor(
    private readonly scrapsDAO: ScrapsDAO,
    private readonly postsDAO: PostsDAO,
    private readonly postsMetricsService: PostsMetricsService,
  ) {}

  // 게시물 스크랩 등록
  async scrapPost(postId: number, sessionUser: IUser): Promise<ScrapsEntity> {
    const { userId } = sessionUser;

    const post = await this.postsDAO.findOnePostByPostId(postId);
    if (!post) throw new NotFoundException(`${postId}번 게시글을 찾을 수 없습니다`);

    if (post.userId === userId) {
      throw new ForbiddenException('자신의 글은 자신이 스크랩할 수 없습니다.');
    }

    // 이미 스크랩한 기록이 있는지 확인
    const existingScrap = await this.scrapsDAO.findScrapByUserIdAndPostId(userId, postId);

    if (existingScrap) {
      if (existingScrap.deletedAt) {
        existingScrap.deletedAt = null;
        await this.scrapsDAO.saveScrap(existingScrap);
        return existingScrap;
      } else {
        throw new ConflictException(`이미 ${postId}번 게시글을 스크랩했습니다.`);
      }
    }

    const createdScrap = await this.scrapsDAO.createScrap(userId, postId);
    await this.scrapsDAO.saveScrap(createdScrap);

    await this.postsMetricsService.incrementScrapCountInMySQL(postId);

    return createdScrap;
  }

  // 특정 게시물 스크랩 취소
  async deleteScrapedPost(postId: number, sessionUser: IUser): Promise<{ message: string }> {
    const { userId } = sessionUser;
    const scrapPost = await this.scrapsDAO.findScrapByUserIdAndPostId(userId, postId);

    if (!scrapPost) throw new NotFoundException(`스크랩한 게시물을 찾을 수 없습니다.`);
    if (scrapPost.userId !== userId) throw new ForbiddenException(`스크랩을 취소할 권한이 없습니다.`);

    const result = await this.scrapsDAO.deleteScrap(scrapPost.scrapId);
    if (result.affected === 0) {
      throw new NotFoundException(`스크랩 취소 중 오류가 발생하였습니다.`);
    }

    await this.postsMetricsService.decrementScrapCountInMySQL(postId);

    return { message: '스크랩이 취소되었습니다.' };
  }
}
