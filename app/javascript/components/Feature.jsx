import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFeature, newComment } from "../services/app_service";
import CommentForm from "./CommentForm";
import Card from 'react-bootstrap/Card';

const Feature = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const [feature, setFeature] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getFeatureData = async () => {
      const data = await getFeature(id)
      setFeature(data.data)
      console.log(data.data)
      setLoading(true)
    }
    getFeatureData()
  }, [])

  const handleSubmit = async (formData) => {
    const commentData = await newComment(id, formData.trim())
    if (commentData.hasOwnProperty("errors")) {
      alert(commentData.errors);
    } else {
      navigate(0);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-5 gap-3">
      <div className="d-flex gap-5" style={{height: '75vh'}}>
        {loading && <>
          <Card>
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <Card.Title>{feature.attributes.title}</Card.Title>
              <Card.Text>
                <strong>Magnitude:</strong> {feature.attributes.magnitude}
                <br />
                <strong>Magnitude Type:</strong> {feature.attributes.mag_type}
                <br />
                <strong>Time:</strong> {new Date(+feature.attributes.time).toDateString()}
                <br />
                <strong>Place:</strong> {feature.attributes.place}
                <br />
                <strong>Longitude:</strong> {feature.attributes.coordinates.longitude}
                <br />
                <strong>Latitude:</strong> {feature.attributes.coordinates.latitude}
                <br />
                <strong>Tsunami:</strong> {feature.attributes.tsunami ? 'Yes' : 'No'}
              </Card.Text>
              <Card.Link href={feature.links.external_url} target="_blank" rel="noreferrer">
                More info...
              </Card.Link>
            </Card.Body>
          </Card>
          
          <div className="d-flex flex-column gap-3">
            <div>
              <CommentForm onSubmit={handleSubmit}/>
            </div>

            <h2>Comments:</h2>

            <div className="h-75 overflow-auto">
              <div className="d-flex flex-column gap-3 h-auto">
                {feature.comments.map((comment) => (
                  <div key={comment.id} className="card">
                    <div className="card-body">{comment.body}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </>}
      </div>
      <button type="button" onClick={() => navigate(-1)} className="btn btn-success">Back</button>
    </div>
  )
}

export default Feature