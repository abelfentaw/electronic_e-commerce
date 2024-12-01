import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Search')
@Controller('search')
export class SearchController {
    constructor(private searchService:SearchService){}
    @Get('find')
    searchProducts(@Query('q') query: string) {
      return this.searchService.searchProducts(query); 
    }
  
    @Get('filter')
    filterProducts(
      @Query('categoryId') categoryId?: number,
      @Query('minPrice') minPrice?: number,
      @Query('maxPrice') maxPrice?: number,
      // @Query('rating') rating?: number,
    ) {
      return this.searchService.filterProducts(categoryId, minPrice, maxPrice);
    }
}
