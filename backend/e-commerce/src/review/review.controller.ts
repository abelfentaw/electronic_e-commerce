import {
  Controller,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/utitlity/auth-guard/authentication.guard';
import { AuthorizeGuard } from 'src/utitlity/auth-guard/authorization.guard';
import { Roles } from 'src/utitlity/roles/user-role.enum';
import { CurrentUser } from 'src/utitlity/current-user.decorator';
import { UserEntity } from 'src/entities/user.entity';

@ApiTags('Review')
@ApiBearerAuth()
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Post()
  addReview(
    @Param('productId') productId: number,
    @Body() createReviewDto: CreateReviewDto,
    @Req() req?:any
  ) 
  {
   const userId =req.user.id
 console.log(userId)
    return this.reviewService.addReview( 
      userId,
      productId,
      createReviewDto
      
    );
    
  }
    @ApiOperation({
      summary:'to return the rating'
    })
    @Get()
    getReview(@Param('productId') productId: number) {
      return this.reviewService.getProductReview(productId);
    }

  //   @Patch(':id')
  //   update(@Req() req:Request, @Param('reviewId') reviewId:number, @Body() updateReviewDto: UpdateReviewDto) {
  //     // const user = req.user.id
  //     return this.reviewService.reviewUpdate(reviewId,  updateReviewDto);
  //   }

  //   @Delete(':id')
  //   remove(@Req() req:Request, @Param('reviewId') reviewId: number) {
  //     // const user = req.user.id
  //     return this.reviewService.removeReview(reviewId,user);
}
// }
