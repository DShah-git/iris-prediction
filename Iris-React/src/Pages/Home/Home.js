import React,{useState,useEffect} from 'react'
import axios from 'axios'
import ResultTable from '../../components/ResultTable/ResultTable';

function Home() {
  
    const [data, setData] = useState({});
    const [showLoading, setShowLoading] = useState(true);
    const apiUrl = "http://localhost:5000/run";
  
    useEffect(() => {
      const fetchData = async () => {
        axios.get(apiUrl)
          .then(result => {
            setData(result.data)
  
            setShowLoading(false)
          }).catch((error) => {
            console.log('error in fetchData:', error)
          });
      };
      fetchData();
    }, []);
  
    return (
      <div className="App">
        <div>
          {showLoading === false ? 
            <div>
              <h2>Prediction Results from json file.</h2>
              <ResultTable data={data} />
            </div>
            :
            <div>
              {showLoading &&
                <span>Waiting for results...</span>
              }
            </div>
          }
        </div>
  
      </div>
    );
}

export default Home