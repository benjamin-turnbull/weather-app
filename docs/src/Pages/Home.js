import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_WEATHER_QUERY } from "../graphql/Queries";
import "../App.css";

function Home() {
  const [citySearched, setCitySearched] = useState("");
  const [getWeather, { data, error }] = useLazyQuery(GET_WEATHER_QUERY, {
    variables: { name: citySearched },
  });

  if (error) return <h1> Error found</h1>;

  if (data) {
    console.log(data);
  }

  return (
    <div className="hero-container">
    <video src='../../public/videos/video-2.mp4' autoPlay loop muted />
      <h1 className="header">Search For Weather</h1>
      <input
        className="field"
        type="text"
        placeholder="City name..."
        onChange={(event) => {
          setCitySearched(event.target.value);
        }}
      />
      <button className="label" onClick={() => getWeather()}> Search</button>
      <div>
        {data && (
          <>
            <h1> {data.getCityByName.name} </h1>
            <h1>
              {" "}
              Temperature: {(data.getCityByName.weather.temperature.actual - 273.15).toFixed(2)}
            </h1>
            <h1>
              Conditions: {data.getCityByName.weather.summary.description}
            </h1>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;