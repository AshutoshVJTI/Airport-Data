import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { GoogleMapsProps, MapProps } from "../types/@types";

const GoogleMap = (props: GoogleMapsProps) => {
  const { children, style, center } = props;
  const ref = React.useRef(null);
  const [map, setMap] = React.useState<any>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  React.useEffect(() => {
    if (map) {
      map.setOptions({center: center, zoom: 4});
    }
  }, [map, center]);

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        window.google.maps.event.clearListeners(map, eventName)
      );
    }
  }, [map]);

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

const Marker = (options: any) => {  
  const [marker, setMarker] = React.useState<any>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      const infowindow = new window.google.maps.InfoWindow({
        content: options && options.position && options.position.air ? options.position.air : '',
      });
      marker.setOptions(options);

      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          shouldFocus: false,
        });
      });
    }
  }, [marker, options]);

  return null;
};

const Map = (props: MapProps) => {
  const { lat1, lon1, air1, lat2, lon2, air2 } = props;
  const markers = [
    { lat: lat1, lng: lon1, air: air1 },
    { lat: lat2, lng: lon2, air: air2 },
  ];

  return (
    <div style={{ display: "flex", height: "300px", width: "100%" }}>
      <Wrapper apiKey="AIzaSyBfvOfQRZDtLzByo5u3jAOCM_eyRqsXnHw">
        <GoogleMap style={{ flexGrow: "1", height: "100%" }} center={{lat: lat1, lng: lon1}}>
          {markers.map((marker, index) => {
            return <Marker position={marker} key={`Marker ${index}`}/>;
          })}
        </GoogleMap>
      </Wrapper>
    </div>
  );
};

export default Map;
