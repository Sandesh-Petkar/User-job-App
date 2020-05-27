import React from 'react'
import ApplicationForm from './ApplicationForm'
import {BrowserRouter,Route} from 'react-router-dom'
import AdminDash from './Admindash'

function App(props){
    return(
        <BrowserRouter>
        <div>
            <h1>User Job Application</h1>
            <Route path="/" component={ApplicationForm} exact={true}/>
            <Route path="/admin" component={AdminDash} exact={true}/>
        </div>
        </BrowserRouter>
        
    )
}

export default App