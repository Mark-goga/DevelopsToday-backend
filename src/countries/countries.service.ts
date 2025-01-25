import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import {HttpService} from "@nestjs/axios";
import {lastValueFrom} from "rxjs";
import { AxiosResponse } from 'axios';
import {Country} from "./entities/country.entity";
import calculatePaginationData from "../utils/calculatePaginationData";
import {AbstractHttpService} from "../common/httpService/AbstractHttpService";
import {CountryInfo, PopulationData} from "./interface/country-details.interface";

@Injectable()
export class CountriesService extends AbstractHttpService{

  private readonly apiUrl = 'https://date.nager.at/api/v3';
  private readonly populationApiUrl = 'https://countriesnow.space/api/v0.1/countries/population';
  private readonly flagApiUrl = 'https://countriesnow.space/api/v0.1/countries/flag/images';

  // constructor(private readonly httpService: HttpService  ) {
  // }

  create(createCountryDto: CreateCountryDto) {
    return 'This action adds a new country';
  }

  async findAll(page: number, perPage: number) {
    // try {
    //   const response: AxiosResponse<Country[]> = await lastValueFrom(this.httpService.get<Country[]>(`${this.apiUrl}/AvailableCountries`));
    //   const data = response.data;
    //
    //   const startIndex = (page - 1) * perPage;
    //   const endIndex = startIndex + perPage;
    //
    //   const paginatedData = data.slice(startIndex, endIndex);
    //
    //   const {totalPages, hasPreviousPage, hasNextPage} = calculatePaginationData(page, perPage, data.length);
    //
    //   return {
    //     data: paginatedData,
    //     totalPages,
    //     hasNextPage,
    //     hasPreviousPage,
    //   }
    // } catch (error) {
    //   throw new HttpException(
    //     'Failed to fetch available countries',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }

  async getCountryDetails(code: string) {
    try {
      // const countryInfo = await lastValueFrom(
      //   this.httpService.get(`${this.apiUrl}/CountryInfo/${code}`),
      // );
      const countryInfo = await this.get<CountryInfo>(`${this.apiUrl}/CountryInfo/${code}`);


      // const populationResponse = await lastValueFrom(
      //   this.httpService.post(this.populationApiUrl, {
      //     country: countryInfo.data.commonName,
      //   }),
      // );
      const populationData = this.post<PopulationData[]>(this.populationApiUrl, { country: countryInfo.commonName });

      // const flagResponse = await lastValueFrom(
      //   this.httpService.post(this.flagApiUrl, {
      //     country: countryInfo.data.commonName,
      //   }),
      // );
      const flagUrl = await this.post<{ data: {flag: string} }>(this.flagApiUrl, { country: countryInfo.commonName });

      return {
        // countryInfo: countryInfo.data,
        // population: populationResponse.data.data.populationCounts || [],
        // flag: flagResponse.data.data.flag || '',
        countryInfo,
        population: populationData,
        flag: flagUrl.data.flag
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch country details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    return `This action updates a #${id} country`;
  }

  remove(id: number) {
    return `This action removes a #${id} country`;
  }
}
