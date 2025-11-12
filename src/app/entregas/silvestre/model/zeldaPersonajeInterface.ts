export interface ZeldaPersonaje {
  id?: string;
  name?: string;
  description?: string;
  gender?: string | null;
  race?: string | null;
  appearances?: string[];
  [key: string]: any;
}
