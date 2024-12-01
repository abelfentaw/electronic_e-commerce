import { Controller,
    Get, 
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Req } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from '../entities/category.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/utitlity/roles/user-role.enum';
import { AuthenticationGuard } from 'src/utitlity/auth-guard/authentication.guard';
import { AuthorizeGuard } from 'src/utitlity/auth-guard/authorization.guard';
import { CurrentUser } from 'src/utitlity/current-user.decorator';
import { UserEntity } from 'src/entities/user.entity';

@ApiTags('Category')
@ApiBearerAuth()
@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
// @UseGuards(AuthGuard)
// @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Post()
 async create(@Body() createCategoryDto: CreateCategoryDto,
              @CurrentUser() currentUser:UserEntity):Promise<CategoryEntity> {
    return await this.categoriesService.create(createCategoryDto, currentUser);
  }

  @Get()
  async findAll():Promise<CategoryEntity[]> {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(
        //  @Param('id') id: string,
    @CurrentUser() user:any): Promise<CategoryEntity>{
    return this.categoriesService.findOne(user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }
  @UseGuards(AuthenticationGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
