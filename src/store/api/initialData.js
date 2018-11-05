import 'isomorphic-fetch'

const handleInitialData = () => {
  const response = fetch('https://react-assessment-api.herokuapp.com/api/drone')
  if (!response.ok) {
    return { error: { code: response.status }}
  }
  const json = response.json()
  return {data: json}
  console.log(data)

}
export default handleInitialData