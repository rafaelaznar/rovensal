export interface AnimalExtinto {
  binomialName: string;
  commonName: string;
  location: string;
  wikiLink: string;
  lastRecord: string;
  imageSrc: string;
  shortDesc: string;
}

export interface RespuestaApi {
  status: string;
  data: AnimalExtinto[];
}
