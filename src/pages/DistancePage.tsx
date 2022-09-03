import { useEffect, useState } from "react";
import Map from "../components/Map";
import DistanceBetween from "../utils/DistanceBetween";
import { airportData } from "../utils/constant";
import { AirportData } from "../types/@types";
import "./distance.css";
import Autocomplete from "../components/Autocomplete";

function DistancePage() {
  const [data, setData] = useState<AirportData[]>([]);
  const [firstAirportLocation, setFirstAirportLocation] = useState<string>('');
  const [secondAirportLocation, setSecondAirportLocation] = useState<string>('');
  const [distance, setDistance] = useState<number>(0);
  const [dataSelected, setDataSelected] = useState<AirportData[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const dataToSet: AirportData[] = airportData.map((item) => ({
      ...item,
      searchArray: item.search?.split("|"),
    }));
    setData(dataToSet);
  }, []);

  useEffect(() => {
    if (firstAirportLocation && secondAirportLocation) {
      if (firstAirportLocation === secondAirportLocation) {
        setError("Can't select same location for airport");
      } else {
        setError('');
      }
    } else {
      setDataSelected([]);
      setDistance(0);
    }
  }, [firstAirportLocation, secondAirportLocation]);

  const submit = () => {
    if (error) {
      return;
    }
    if (firstAirportLocation && secondAirportLocation) {
      const firstCode: string = firstAirportLocation.split("-")[0];
      const secondCode: string = secondAirportLocation.split("-")[0];
      const selectData: AirportData[] = airportData.filter(
        (item) => item.code === firstCode || item.code === secondCode
      );
      const distance = DistanceBetween(
        selectData[0].lat,
        selectData[0].lng,
        selectData[1].lat,
        selectData[1].lng
      );
      setDataSelected(selectData);
      setDistance(distance);
      setError('');
    } else {
      setError("Both field is required");
      setDataSelected([]);
      setDistance(0);
    }
  };

  return (
    <div className="main-wrapper">
      <div className="container">
        <div className="card">
          <h1 className="main-heading">Distance Between Two Airports</h1>
          <div className="main-fields-wrapper">
            <Autocomplete
              label="Airport 1"
              data={data}
              setValue={setFirstAirportLocation}
              placeholder="From"
            />
            <Autocomplete
              label="Airport 2"
              data={data}
              setValue={setSecondAirportLocation}
              placeholder="To"
            />
          </div>
          <div className="button-wrapper">
            <button className="submit-button" onClick={() => submit()}>
              Submit
            </button>
          </div>
          {distance && dataSelected.length ? (
            <p className="distance">{`Distance From ${dataSelected[0].name
              } To ${dataSelected[1].name} is : ${distance.toFixed(2)} Nautical Miles`}</p>
          ) : <div />}
          {error && <p className="error">{error}</p>}
          {dataSelected.length ? (
            <Map
              lat1={dataSelected[0].lat}
              lon1={dataSelected[0].lng}
              air1={dataSelected[0].name}
              lat2={dataSelected[1].lat}
              lon2={dataSelected[1].lng}
              air2={dataSelected[1].name}
              distance={distance}
            />
          ) : <div />}
        </div>
      </div>
    </div>
  );
}

export default DistancePage;
