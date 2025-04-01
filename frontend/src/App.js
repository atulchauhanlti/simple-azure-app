import React from 'react';
import axios from 'axios';

function App() {
  const fetchApi = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data'); 
      console.log(response.data); 
    } catch (error) {
      console.error('Error fetching data:', error);
      console.log('Failed to fetch data!');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to My Simple App</h1>
      <button onClick={fetchApi}>Call API</button>
    </div>
  );
}

export default App;
