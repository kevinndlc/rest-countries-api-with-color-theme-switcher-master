import type { Region } from "./types";

export interface CountryFiltersIntf {
  search: string;
  region: Region;
}

export interface CountryFiltersUpdateIntf {
  search?: string;
  region?: Region;
}