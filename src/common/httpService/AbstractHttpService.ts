import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class AbstractHttpService {
	constructor(private readonly httpService: HttpService) {}

	async get<T>(url: string): Promise<T> {
		const response = await lastValueFrom(this.httpService.get<T>(url));
		return response.data;
	}

	async post<T>(url: string, body: any): Promise<T> {
		const response = await lastValueFrom(this.httpService.post<T>(url, body));
		return response.data;
	}
}