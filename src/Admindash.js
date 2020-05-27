import React from 'react'
import axios from 'axios'
import moment from 'moment'

class AdminDash extends React.Component{
    constructor(){
        super()
        this.state={
            candidates:[],
            jobtitle:['Front-End Developer','Node.js Developer','MEAN Stack Developer','FULL Stack Developer'],
            selectedjob:'Front-End Developer'
        }
    }

    componentDidMount(){
        axios.get('http://dct-application-form.herokuapp.com/users/application-forms')
        .then((response)=>{
            console.log(response.data)
            const candidates=response.data
            this.setState({candidates})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    changeTitle=(title)=>{
        this.setState({selectedjob:title})
    }

    handleDetails=(id)=>{
        axios.get(`http://dct-application-form.herokuapp.com/users/application-form/${id}`)
        .then((response)=>{
                // console.log(response.data)
                const candidate=response.data
                alert(`${candidate.name}--${candidate.email}--${candidate.status}`)
        })
    }

    handleStatus=(id,status)=>{
        axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`,{status})
        .then((response)=>{
            const candidate=response.data
            this.setState((prevState)=>{
                return {
                    candidates:prevState.candidates.map((cand)=>{
                        if(cand._id===candidate._id){
                            return {...candidate}
                        }else{
                            return{...cand}
                        }
                    })
                }
            })
        })
    }

    render(){
        return(
            <div>
                <h2> Admin dashboard</h2>

                {
                    this.state.jobtitle.map((title)=>{
                        return <button onClick={()=>{this.changeTitle(title)}}> {title} </button>
                    })
                }

                <h1> {this.state.selectedjob}</h1>
                <p>List of canditate applied for {this.state.selectedjob}s</p>
                <table>
                    <thead>
                        <tr>
                            <th> Name </th>
                            <th>Technical Skills</th>
                            <th> Experience </th>
                            <th>Applied Date</th>
                            <th> View Details</th>
                            <th> Update Application Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.candidates.filter(candidate=>candidate.jobTitle===this.state.selectedjob).map((candidate)=>{
                                    return ( <tr>
                                        

                                        <td>{candidate.name}</td>
                                        <td>{candidate.skills}</td>
                                        <td>{candidate.experience}</td>
                                        <td>{moment(candidate.createdAt).format("DD/MM/YYYY")}</td>
                                        <td><button onClick={()=>{this.handleDetails(candidate._id)}}> View details</button></td>
                                        
                                        {candidate.status==='applied' ?(
                                            <div>
                                                <td><button onClick={()=>{
                                                    this.handleStatus(candidate._id,'shortlisted')
                                                }}>Shortlist</button> 
                                                <button onClick={()=>{
                                                    this.handleStatus(candidate._id,'rejected')
                                                }}>Reject</button></td>
                                            </div>
                                        ):(
                                            <div>
                                                <button>{candidate.status}</button>
                                            </div>
                                        )}
                                        
                                    </tr>
                                    )
                            })
                        }

                    </tbody>
                </table>
            </div>
        )
    }
}

export default AdminDash