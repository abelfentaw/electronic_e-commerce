/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/review.entity';
import { DeleteResult, Repository } from 'typeorm';
// import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
// import { CurrentUser } from 'src/utitlity/current-user.decorator';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
      private userService:UserService,
    private productService: ProductService,
  ) {}

  async addReview(
    userId:number,
    productId:number,
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    try {
      const user=await this.userService.findOne(userId)
    if(!user) throw new NotFoundException('user not found')
    const product = await this.productService.findOne(productId);
    if (!product) throw new NotFoundException('product not found');
    // product.user = currentUser;

    const review = this.reviewRepository.create({
      user,
      ...product,
      ...createReviewDto,
    });

    return await this.reviewRepository.save(review);
  }
     catch (error) {
      console.log(`some error ${error}`)  }
     }    

  async reviewUpdate(
    userId: any,
    reviewId: number,
    updateReviewDto: UpdateReviewDto,
  ) {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId, user: { id: userId } },
    });
    if (!review) throw new NotFoundException('there is no review');

    review.rating = updateReviewDto.Rating;
    review.comment = updateReviewDto.comment;

    return this.reviewRepository.save(review);
  }

  async removeReview(
    reviewId: number,
    currentUser: UserEntity,
  ): Promise<DeleteResult> {
    const review = this.reviewRepository.findOne({ where: { id: reviewId } });
    // (await review).user = currentUser;
    if (!review) throw new NotFoundException('there is review');
    return await this.reviewRepository.delete(await review);
  }

  async getProductReview(productId: number) {
    return await this.reviewRepository.find({
      where: { products: { id: productId } },
      // relations: { user: true },
    });
  }
}
