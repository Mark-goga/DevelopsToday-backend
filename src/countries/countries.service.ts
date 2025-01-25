import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import calculatePaginationData from "../utils/calculatePaginationData";
import {AbstractHttpService} from "../common/httpService/AbstractHttpService";
import {Country, CountryDetailsResponse, CountryInfo, PopulationResponse} from "./interface/country-details.interface";

@Injectable()
export class CountriesService extends AbstractHttpService{

  private readonly apiUrl = 'https://date.nager.at/api/v3';
  private readonly populationApiUrl = 'https://countriesnow.space/api/v0.1/countries/population';
  private readonly flagApiUrl = 'https://countriesnow.space/api/v0.1/countries/flag/images';

  async findAll(page: number, perPage: number) {
    try {
      const data: Country[] = await this.get<Country[]>(`${this.apiUrl}/AvailableCountries`);

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

  async getCountryDetails(code: string): Promise<CountryDetailsResponse> {
    try {
      const countryInfo = await this.get<CountryInfo>(`${this.apiUrl}/CountryInfo/${code}`);
      const body = {
        country: countryInfo.commonName
      }
      const { data: populationData } = await this.post<PopulationResponse>(this.populationApiUrl, body);

      const {data: flagUrl} = await this.post<{ data: { flag: string } }>(this.flagApiUrl, body);

      return {
        countryInfo,
        population: populationData.populationCounts,
        flag: flagUrl.flag
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch country details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
