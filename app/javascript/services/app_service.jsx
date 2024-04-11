const URL = '/api/v1'

export async function getFeaturesList() {
  const res = await fetch(`${URL}/features`)
  return await res.json()
}

export async function getFilteredFeaturesList(magType=' ', page = 1) {
  const res = await fetch(`${URL}/features?mag_type=${magType}&page=${page}`)
  return await res.json()
}

export async function getFeature(id) {
  const res = await fetch(`${URL}/features/${id}`)
  return await res.json()
}

export async function newComment(id, commentData) {
  const res = await fetch(`${URL}/features/${id}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({data: { body: commentData }})
  })
  return await res.json()  
}