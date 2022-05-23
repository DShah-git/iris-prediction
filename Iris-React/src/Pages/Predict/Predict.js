import './Predict.css'
import React,{useState} from 'react'
import axios from 'axios';
import ResultTable from '../../components/ResultTable/ResultTable'
function Predict() {
    
    const [inputCount, setinputCount] = useState([1]);
    const [Sepal_L, setSepal_L] = useState([""]);
    const [Sepal_W, setSepal_W] = useState([""]);
    const [Petal_L, setPetal_L] = useState([""]);
    const [Petal_W, setPetal_W] = useState([""]);

    const [data,setData] = useState([]);
    const [loading,setLoading] = useState();

    const url = "http://localhost:5000/userInput"

    function predict(){
      
      setLoading(true);
      var userInput = []

      setData([])
      
      for(let i=0;i<inputCount.length;i++){
        if(Sepal_L[i]===""||Sepal_W[i]===""||Petal_L[i]===""||Petal_W[i]==="")
        { console.log("something is empty")
          return "Something is empty"}

        userInput.push({
          "sepal_length":Number(Sepal_L[i]),
          "sepal_width":Number(Sepal_W[i]),
          "petal_length":Number(Petal_L[i]),
          "petal_width":Number(Petal_W[i]),
        })
      }

      console.log(userInput)

      axios.post(url,{userInput:userInput}).then((result) => {
        console.log(result)
        setData(result.data)
        setLoading(false);

      }).catch((err) => {
        console.log(err)
      });

    }

    function subtract(){
      var ic = [...inputCount]
      ic.pop(ic.length+1)
      setinputCount(ic)

      var sl = [...Sepal_L]
      sl.pop("")
      setSepal_L(sl)
      
      var sw = [...Sepal_W]
      sw.pop("")
      setSepal_W(sw)

      var pl = [...Petal_L]
      pl.pop("")
      setPetal_L(pl)

      var pw = [...Petal_W]
      pw.pop("")
      setPetal_W(pw)
      
    }

    function Add(){
      var ic = [...inputCount]
      ic.push(ic.length+1)
      setinputCount(ic)

      var sl = [...Sepal_L]
      sl.push("")
      setSepal_L(sl)
      
      var sw = [...Sepal_W]
      sw.push("")
      setSepal_W(sw)

      var pl = [...Petal_L]
      pl.push("")
      setPetal_L(pl)

      var pw = [...Petal_W]
      pw.push("")
      setPetal_W(pw)
      
 
    }

    function sepalLengthChanged(index,e){
      var sl = [...Sepal_L]
      sl[index] = e.target.value
      setSepal_L(sl)
    }

    function sepalWidthChanged(index,e){
      var sw = [...Sepal_W]
      sw[index] = e.target.value
      setSepal_W(sw)
    }

    function petalLengthChanged(index,e){
      var pl = [...Petal_L]
      pl[index] = e.target.value
      setPetal_L(pl)
    }

    function petalWidthChanged(index,e){
      var pw = [...Petal_W]
      pw[index] = e.target.value
      setPetal_W(pw)
    }
 

    return (
    <div className="conatiner App">
      <h2>Enter and Submit Data for Prediction</h2>
      <div className='forms'>
      {
          inputCount.map((count,index)=>{
            return(
              <div className="card">
                <div>
                  <p> Sepal Length : &nbsp;
                    <input type="number" onChange={(e)=>{sepalLengthChanged(index,e)}}></input> 
                  </p>
                </div>
                <div>
                  <p> Sepal Width : &nbsp;
                    <input type="number" onChange={(e)=>{sepalWidthChanged(index,e)}}></input> 
                  </p>
                </div>
                <div>
                  <p> Petal Length : &nbsp;
                    <input type="number" onChange={(e)=>{petalLengthChanged(index,e)}}></input> 
                  </p>
                </div>
                <div>
                  <p> Petal Length : &nbsp;
                    <input type="number" onChange={(e)=>{petalWidthChanged(index,e)}}></input> 
                  </p>
                </div>
                
                {index!==0&&<div>
                  <button onClick={()=>subtract()} className='subtract' style={{float:"right"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                  </svg>
                  </button>
                </div>}
              </div>
            ) 
          })
      }
      </div>
      
      
      <div className='button-group'>
        <button onClick={()=>{Add()}} className='Add'>Add Data Point</button>
        <button onClick={()=>{predict()}} className='Submit'>Predict</button>
      </div>

      {loading&&
                    <h6>Loading...</h6>
                }

      <ResultTable data={data}/>

    </div>
  )
}

export default Predict