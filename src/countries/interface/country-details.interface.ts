export interface Country {
	countryCode: string;
	name: string;
}
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

interface PopulationCounts {
	year: number;
	value: number;
}

interface PopulationData {
	country: string;
	code: string;
	iso3: string;
	populationCounts: PopulationCounts[];
}

export interface PopulationResponse {
	data: PopulationData;
}

export interface CountryDetailsResponse {
	countryInfo: CountryInfo;
	population: PopulationCounts[];
	flag: string;
}