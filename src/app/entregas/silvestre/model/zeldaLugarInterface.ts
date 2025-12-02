export interface ZeldaLugar {
  id: string;
  name: string;
  description: string;
  inhabitants?: string[];
  appearances?: string[];
  // Campos resueltos con los nombres reales
  inhabitantsNames?: string[];
  appearancesNames?: string[];
}
