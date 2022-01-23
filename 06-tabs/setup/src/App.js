import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'
function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);


const fetchJobs = async () => {
  const response = await fetch(url);
  const newJobs = await response.json();
  setJobs(newJobs);
  setLoading(false);
}

useEffect(() => {
  fetchJobs()
}, []);

if(loading){
  return <section className="section-loading">
  <h1>loading...</h1>
  </section>
}

const {company, dates,duties, title} = jobs[value];
  return <section className="section">
  <div className="title">
  <h2>experience</h2>
  <div className="underline"></div>
  </div>
  <div className="jobs-center">
   {/**button container */}
   <div className="btn-container">
  {
     jobs.map((job, index) => {
     return <button key={job.id} onClick={() => 
      setValue(index)}
      className={`job-btn ${index === value && 'active'}`}>{job.company}</button>
     
   })
  }
   </div>
   {/**job info */}
   <article className="job-info">
   <h3>{title}</h3>
   <h4>{company}</h4>
   <p className="job-date">
   {dates}
   {
     duties.map((duty, index) => {
       return (
         <div className="job-desc" key={index}>
       <FaAngleDoubleRight
       className="job-icon"></FaAngleDoubleRight>
       <p>{duty}</p>
       </div>
       )
     })
   }
   </p>
   </article>
  </div>
  </section>
}

export default App
