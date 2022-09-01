declare global {
    interface Window {
      google: any;
    }
  }

export interface AirportData {
    city: string,
    code: string,
    lat: number,
    lng: number,
    name: string,
    search: any,
    state: string,
    statename: string,
}

export interface AutocompleteProps {
    label: string,
    data: AirportData[],
    setValue: React.Dispatch<React.SetStateAction<string>>,
    placeholder: string,
}

export interface option {
    value: string;
    label: string;
}

export interface MapProps {
    air1: string;
    lat1: number;
    lon1: number;
    air2: string;
    lat2: number;
    lon2: number;
    distance: number;
}

export interface GoogleMapsProps {
    children: React.ReactNode;
    style: any;
    center: {lat: number, lng: number}
    zoom: number;
}

export interface LatLng {
    lat: number;
    lng: number;
  };