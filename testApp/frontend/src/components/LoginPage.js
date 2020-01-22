import React from 'react'
import "../stylesheets/loginPage.css"

const LoginPage = (props) =>{
    return (
        <div className="login">
            <h3>Please Login</h3>
            <form id="loginForm" onSubmit={(e) => props.submit(e)}>
                <div className="inputDiv">
                    <label>Username:</label>
                    <br/>
                    <input type="text" placeholder="username" name="username" value={props.loginObj.username} onChange={(e) => props.changeHandler(e)} />
                </div>
                <div className="inputDiv">
                    <label>Password:</label>
                    <br/>
                    <input type="password" placeholder="password" name="password" value={props.loginObj.password} onChange={(e) => props.changeHandler(e)} />
                </div>
                <div className="inputDiv">
                    <input className="submitButton" type="submit" value="Login" />
                </div>
            </form>
            {props.errorStatus === true ? <span className="errorSpan">Invalid Username or Password. Please Try Again.</span> : null}
        </div>
    )
}

export default LoginPage
