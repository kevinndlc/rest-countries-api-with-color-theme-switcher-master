export interface CountryIntf {
  name: CountryNameIntf;
  cca3: string;
  capital: string[];
  region: string;
  subregion: string;
  population: number;
  currencies: any;
  languages: any;
  flags: any;
  borders: string[];
  tld: string[];
}

export interface CountryNameIntf {
  common: string;
  official: string;
  nativeName: any;
}