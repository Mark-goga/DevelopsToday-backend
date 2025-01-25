import {Controller, Get, Param, Query} from '@nestjs/common';
import { CountriesService } from './countries.service';


@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const perPageNumber = parseInt(perPage, 10) || 10;

    return this.countriesService.findAll(pageNumber, perPageNumber);
  }

  @Get(':code')
  getCountryDetails(@Param('code') code: string) {
    return this.countriesService.getCountryDetails(code);
  }

}
