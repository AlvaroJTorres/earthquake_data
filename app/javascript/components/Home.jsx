import React from "react";
import GridTable from "./GridTable";

const Home = () => {
  return (
    <div className="vw-100 primary-color d-flex flex-column align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Earthquake Data</h1>
          <p className="lead">
            A list of reports on earthquakes and their locations.
          </p>
          <hr className="my-4" />
        </div>
      </div>
      <div>
        <GridTable/>
      </div>
    </div>
  )
};

export default Home