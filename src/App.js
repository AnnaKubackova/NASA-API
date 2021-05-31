import Fetch from './Components/Fetch/Fetch';
import './css/style.css';
import Form from './Components/Form/Form';

const nasaEndpoint = process.env.REACT_APP_NASA_ENDPOINT;

const App = () => {

  return (
    <main>
      <Form />
      <h1 className="my-2">NASA API</h1>
      <h2>Astronomy Picture of the Day</h2>
      <Fetch url={`${nasaEndpoint}planetary/apod?api_key=DEMO_KEY`}/>
    </main>
  );
};

export default App;