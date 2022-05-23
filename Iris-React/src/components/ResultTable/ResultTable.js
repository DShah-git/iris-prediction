import React from 'react'
import './table.css'

function ResultTable({data}) {
  
  if(!data || data.length===0){
    return <div className='App'>
      <h2>  No Data Yet </h2>
    </div>
  }
  
  return (
    <table className="responsive-table">
              <thead>
                <tr>
                  <th>Test #</th>
                  <th>Setosa</th>
                  <th>Virginica</th>
                  <th>Versicolor</th>
                </tr>
              </thead>
              
              <tbody>
                {
                  data.map((test,index)=>{
                    return(
                      <tr key="index">
                        <td>{index+1}</td>
                        {test.map((result,resultIndex)=>{
                          return(
                            <td style={{fontWeight:(Math.round(Number(result)))?'800':'400'}}>
                              {(Math.round(Number(result)))? 'Yes': 'No' }
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
  )
}

export default ResultTable