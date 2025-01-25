import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import {HttpService} from "@nestjs/axios";
import {lastValueFrom} from "rxjs";
import { AxiosResponse } from 'axios';
import {Country} from "./entities/country.entity";
import calculatePaginationData from "../utils/calculatePaginationData";

@Injectable()
export class CountriesService {

  private readonly apiUrl = 'https://date.nager.at/api/v3';

  constructor(private readonly httpService: HttpService  ) {
  }

  create(createCountryDto: CreateCountryDto) {
    return 'This action adds a new country';
  }

  async findAll(page: number, perPage: number) {
    try {
      const response: AxiosResponse<Country[]> = await lastValueFrom(this.httpService.get<Country[]>(`${this.apiUrl}/AvailableCountries`));
      const data = response.data;

      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;

      const paginatedData = data.slice(startIndex, endIndex);

      const {totalPages, hasPreviousPage, hasNextPage} = calculatePaginationData(page, perPage, data.length);

      return {
        data: paginatedData,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      }
    } catch (error) {
      throw new HttpException(
        'Failed to fetch available countries',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} country`;
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    return `This action updates a #${id} country`;
  }

  remove(id: number) {
    return `This action removes a #${id} country`;
  }
}
