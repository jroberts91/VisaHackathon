import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';

function InitMap(props) {
  let ref;
  const [Lat, setLat] = useState(props.coord.lat);
  const [Lng, setLng] = useState(props.coord.lng);
  const [VisaMerch, setVisaMerch] = useState([]);
  const [Visell, setVisell] = useState([]);
  const [VisellPos, setVisellPos] = useState([]);
  const [Center, setCenter] = useState({});
  const [Zoom, setZoom] = useState(16);

  const getCenterPos = () => {
    let fn = ref.getCenter();
    let lat = fn.lat();
    let lng = fn.lng();
    setLat(lat);
    setLng(lng);
  };

  useEffect(() => {
    setCenter({ lat: props.coord.lat, lng: props.coord.lng });
  }, []);

  useEffect(() => {
    props.getCP(Lat, Lng);
  }, [Lat]);

  useEffect(() => {
    setVisaMerch(props.visa);
    setVisell(props.visell);
  }, [props.visa, props.visell]);

  useEffect(() => {
    setVisellPos(props.visellPos);
    if (VisellPos.length > 0) {
      setCenter(VisellPos[0]);
      setZoom(18);
    }
  }, [props.visellPos]);

  return (
    <GoogleMap
      ref={(mapRef) => (ref = mapRef)}
      defaultZoom={Zoom}
      zoom={Zoom}
      defaultCenter={{ lat: props.coord.lat, lng: props.coord.lng }}
      onCenterChanged={getCenterPos}
      center={Center}
    >
      {VisaMerch.map((shop) => (
        <Marker
          key={shop.responseValues.visaStoreId}
          position={{
            lat: parseFloat(shop.responseValues.locationAddressLatitude),
            lng: parseFloat(shop.responseValues.locationAddressLongitude),
          }}
          icon={{
            url: 'visa.png',
            scaledSize: new window.google.maps.Size(50, 50),
          }}
        />
      ))}
      {Visell.map((shop, i) => (
        <Marker
          key={i}
          position={{
            lat: shop.lat,
            lng: shop.lng,
          }}
          icon={{
            url: 'visell.png',
            scaledSize: new window.google.maps.Size(50, 50),
          }}
        />
      ))}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(InitMap));

function Map(props) {
  const [InitLat, setInitLat] = useState(1.37);
  const [InitLng, setInitLng] = useState(103.9);
  const [Lat, setLat] = useState(0);
  const [Lng, setLng] = useState(0);

  useEffect(() => {
    props.setCoord({ lat: Lat, lng: Lng });
  }, [Lat]);

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    var crd = pos.coords;
    setInitLat(crd.latitude);
    setInitLng(crd.longitude);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  navigator.geolocation.getCurrentPosition(success, error, options);

  const getCenter = (lat, lng) => {
    if (lng > 180) lng -= 360;
    setLat(lat);
    setLng(lng);
  };
  return (
    <div>
      <div
        style={{
          width: '500px',
          height: '500px',
          marginLeft: '50px',
          marginTop: '50px',
          border: 'solid',
          borderWidth: 'thin',
        }}
      >
        <WrappedMap
          googleMapURL={
            'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDD_LZoOgt7th9UQVMl2nGbJ3_N-TOvRz4'
          }
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          coord={{ lat: InitLat, lng: InitLng }}
          getCP={getCenter}
          visa={props.visaMerch}
          visell={props.visell}
          visellPos={props.visellPos}
        />
      </div>
    </div>
  );
}

export default Map;
