// external dependencies
import React, { Component } from 'react'
// control dependencies
import * as API from '../api/Api'
// custom components
import LoginForm from '../components/LoginForm'
import Loading from '../components/Loading'
// other dependencies
import './styles/Login.css'

class Login extends Component {
  constructor (props) {
    super()
    this.state = {
      loading: false,
      error: null,
      form: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.manageResponse = this.manageResponse.bind(this)
  }

  handleChange (event) {
    const nextForm = this.state.form
    nextForm[event.target.name] = event.target.value
    this.setState({
      form: nextForm
    })
  }

  async handleSubmit (event) {
    event.preventDefault()
    this.setState({ loading: true, error: null })
    const { email, password } = this.state.form
    const result = await API.Auth.signIn(email, password)
    this.manageResponse(result)
  }

  manageResponse (res) {
    if (!res) {
      this.setState({
        error: 'There was a problem while sign in the app',
        loading: false
      })
    } else if (!res.success) {
      this.setState({
        error: res.messages ||
               res.errors ||
               'There was a problem while sign in the app',
        loading: false
      })
    } else {
      this.props.history.push('/home')
    }
  }

  render () {
    return (
      <div className='layout'>
        <div className='z-depth-5 floating-div'>
          <div className='FormContainer'>
            <h4>Iniciar sesión</h4>
            <br />
            {this.state.loading && (
              <Loading size='micro' className='none' />
            )}
            {this.state.error && (
              <div className='error'>{this.state.error}</div>
            )}
            <LoginForm
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Login
