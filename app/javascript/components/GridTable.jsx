import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { getFeaturesList, getFilteredFeaturesList } from "../services/app_service";
import { Link } from 'react-router-dom';

const GridTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(undefined)
  const [earthquakes, setEarthquakes] = useState([])
  const [pagination, setPagination] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const getFeaturesData = async () => {
      const data = await getFeaturesList()
      setEarthquakes(data.data)
      setPagination(data.pagination)
      setLoaded(true)
    }
    getFeaturesData()
   }, [])

   useEffect(() => {
    const getFilteredFeaturesData = async () => {
      const data = await getFilteredFeaturesList(filter, currentPage)
      setEarthquakes(data.data)
      setPagination(data.pagination)
      setLoaded(true)
    }
    getFilteredFeaturesData()
   }, [filter, currentPage])

  const itemsPerPage = pagination.per_page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const options = ["md", "ml", "ms", "mw", "me", "mi", "mb", "mlg"]

  const pageNumbers = Array.from({length: pagination.pages}, (_, i) => i + 1)

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSelectChange = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div className='d-flex flex-column gap-3'>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Filter by MagType</Form.Label>
        <Form.Select onChange={handleSelectChange} value={filter}>
          <option value="">Select an option</option>
          {options.map((option, index) => (<option key={index} value={option}>{option}</option>))}
        </Form.Select>
      </Form.Group>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>MagType</th>
            <th>Magnitude</th>
            <th>Time</th>
            <th>Place</th>
            <th>Longitude</th>
            <th>Latitude</th>
            <th>Tsunami</th>
            <th>External URL</th>
          </tr>
        </thead>
        <tbody>
          {loaded && earthquakes.map((item, index) => (
            <tr key={item.id}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td><Link to={`/features/${item.id}`}>{item.attributes.title}</Link></td>
              <td>{item.attributes.mag_type}</td>
              <td>{item.attributes.magnitude}</td>
              <td>{new Date(+item.attributes.time).toDateString()}</td>
              <td>{item.attributes.place}</td>
              <td>{item.attributes.coordinates.longitude}</td>
              <td>{item.attributes.coordinates.latitude}</td>
              <td>{item.attributes.tsunami ? 'Yes' : 'No'}</td>
              <td><a href={item.links.external_url} target="_blank" rel="noreferrer">{item.links.external_url}</a></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {pageNumbers.map((number) => (
          <Pagination.Item key={number} onClick={() => paginate(number)} active={number === currentPage}>
            {number}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default GridTable;