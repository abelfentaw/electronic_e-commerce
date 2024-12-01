import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProductEntity])],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
