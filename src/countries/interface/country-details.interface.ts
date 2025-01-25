export interface CountryInfo {
	commonName: string;
	officialName: string;
	countryCode: string;
	region: string;
	borders: BorderCountry[] | null;
}

export interface BorderCountry {
	commonName: string;
	officialName: string;
	countryCode: string;
	region: string;
	borders: null;
}

export interface PopulationData {
	year: number;
	value: number;
}

export interface CountryDetailsResponse {
	countryInfo: CountryInfo;
	population: PopulationData[];
	flag: string;
}