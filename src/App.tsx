import React, { useEffect, useState } from "react";
import { airportData } from "./utils/constant";
import DistanceBetween from "./utils/DistanceBetween";
import SearchField from "./components/SearchField";
import "antd/dist/antd.css";
import "./App.css";
import { AirportData } from "./types/@types";
import Map from "./components/Map";

function App() {
  const [data, setData] = useState<AirportData[]>([]);
  const [value1, setValue1] = useState<string | null>(null);
  const [value2, setValue2] = useState<string | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [dataSelected, setDataSelected] = useState<AirportData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dataToSet = airportData.map((item) => ({
      ...item,
      search: item.search.split("|"),
    }));
    setData(dataToSet);
  }, []);

  useEffect(() => {
    if (value1 !== null && value2 !== null) {
      if (value1 === value2) {
        setError("Cant select same location for airport");
      } else {
        setError(null);
      }
    } else {
      setDataSelected(null);
      setDistance(null);
    }
  }, [value1, value2]);

  const submit = () => {
    if (error !== null) {
      return;
    }
    if (value1 !== null && value2 !== null) {
      const firstCode = value1.split("-")[0];
      const secondCode = value2.split("-")[0];
      const selectData = airportData.filter(
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
      setError(null);
    } else {
      setError("both field is required");
      setDataSelected(null);
      setDistance(null);
    }
  };

  return (
    <div className="main-wrapper">
      <div className="container">
        <div className="card">
          <h1 className="main-heading">Distance Between Two Airports</h1>
          <div className="main-fields-wrapper">
            <SearchField
              label="Airport 1"
              data={data}
              setValue={setValue1}
              placeholder="From"
            />
            <SearchField
              label="Airport 2"
              data={data}
              setValue={setValue2}
              placeholder="To"
            />
          </div>
          <div className="button-wrapper">
            <button className="submit-button" onClick={() => submit()}>
              submit
            </button>
          </div>
          {distance && dataSelected && (
            <p className="distance">{`Distance From ${
              dataSelected[0].name
            } To ${dataSelected[1].name} is : ${distance.toFixed(2)} Nautical Miles`}</p>
          )}
          {error && <p className="error">{error}</p>}
        {dataSelected && (
            <Map
              lat1={dataSelected[0].lat}
              lon1={dataSelected[0].lng}
              air1={dataSelected[0].name}
              lat2={dataSelected[1].lat}
              lon2={dataSelected[1].lng}
              air2={dataSelected[1].name}
            />
        )}
        </div>
      </div>
    </div>
  );
}

export default App;
