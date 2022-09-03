import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { GoogleMapsProps, MapProps, MarkerProps } from "../types/@types";
import calculateMidPoint from "../utils/CalculateMidpoint";

const GoogleMap = (props: GoogleMapsProps) => {
  const { children, style, center, zoom = 3 } = props;
  const ref = useRef(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
    return () => {
      if (map) {
        setMap(undefined);
      }
    };
  }, [ref, map]);

  useEffect(() => {
    if (map) {
      map.setOptions({ center: center, zoom: zoom });
    }
  }, [map, center, zoom]);

  // useEffect(() => {
  //   if (map) {
  //     ["click", "idle"].forEach((eventName) =>
  //       window.google.maps.event.clearListeners(map, eventName)
  //     );
  //   }
  // }, [map]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker = (options: MarkerProps) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      const infowindow = new window.google.maps.InfoWindow({
        content:
          options && options.position && options.position.air
            ? options.position.air
            : "",
      });
      marker.setOptions(options);

      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          shouldFocus: false,
        });
      });
    }

    return () => {
      if (marker) {
        google.maps.event.clearListeners(marker, "click");
      }
    };
  }, [marker, options]);

  return null;
};

const Map = (props: MapProps) => {
  const { lat1, lon1, air1, lat2, lon2, air2, distance } = props;
  const markers = [
    { lat: lat1, lng: lon1, air: air1 },
    { lat: lat2, lng: lon2, air: air2 },
  ];
  const midpoint = calculateMidPoint(
    { lat: lat1, lng: lon1 },
    { lat: lat2, lng: lon2 }
  );
  const zoom: number = distance < 2000 ? 5 - distance / 400 : 2.5;
  if (!process.env.REACT_APP_GOOGLE_API_KEY)
    return (
      <h3 style={{ color: "red" }}>
        Please provide Google API Key in .env file to view map
      </h3>
    );

  return (
    <div style={{ display: "flex", height: "300px", width: "100%" }}>
      <Wrapper apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
        <GoogleMap
          style={{ flexGrow: "1", height: "100%" }}
          center={{ lat: midpoint[0], lng: midpoint[1] }}
          zoom={zoom}
        >
          {markers.map((marker, index) => {
            return <Marker position={marker} key={`Marker ${index}`} />;
          })}
        </GoogleMap>
      </Wrapper>
    </div>
  );
};

export default Map;
