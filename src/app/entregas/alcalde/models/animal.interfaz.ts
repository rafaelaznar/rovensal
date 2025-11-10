/**
 * Interfaz que representa un animal extinto según la API de Cheba
 * Los nombres de propiedades coinciden con los que devuelve la API (en inglés)
 */
export interface AnimalExtinto {
  /** Nombre científico binomial del animal */
  binomialName: string;
  
  /** Nombre común del animal (puede estar vacío) */
  commonName: string;
  
  /** Ubicación geográfica donde habitaba */
  location: string;
  
  /** Enlace a la página de Wikipedia del animal */
  wikiLink: string;
  
  /** Año del último registro conocido */
  lastRecord: string;
  
  /** URL de la imagen del animal */
  imageSrc: string;
  
  /** Descripción corta del animal */
  shortDesc: string;
}

/**
 * Interfaz para la respuesta de la API
 */
export interface RespuestaApi {
  /** Estado de la respuesta */
  status: string;
  
  /** Array de animales extintos */
  data: AnimalExtinto[];
}
