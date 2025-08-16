
import React from "react";
class Register extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      password: '',
      name: ''
    };
  }
 onNameChange = (event) => {
    this.setState({name: event.target.value });
  }
  onEmailChange = (event) => {
    this.setState({email: event.target.value });
  }
  onPasswordChange = (event) => {
    this.setState({password: event.target.value });
  }
   onSubmitRegister = (event) => {
    event.preventDefault();
//Valid Password
if (this.state.password.length < 6) {
  return alert("Password must be at least 6 characters long.");
}
//Valid Email
const emailRegex = /^\S+@\S+\.\S+$/; // A simple regex for basic email format validation
if (!emailRegex.test(this.state.email)) {
  return alert("Please enter a valid email address.");
}

    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Registration failed');
        }
      })
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          console.log('Registration successful:', user);
          this.props.onRouteChange('home');
        } else {
          alert('Registration failed: Invalid response');
        }
      })
      .catch(err => {
        console.error(err);
        alert('Registration failed: Please enter valid details');
      });
  }

  render() {
    
    const { onRouteChange } = this.props;
    // Signin component renders a simple form for user sign-in
    return (
      <article className="br4 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f4 fw6 ph0 mh0">Register</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" for="Full Name">Name</label>
        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="text" 
        name="Name"  
        id="Name"
        onChange={this.onNameChange}/>
      </div>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" for="email-address">Email</label>
        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="email" 
        name="email-address"  
        id="email-address"
        onChange={this.onEmailChange}/>
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" for="password">Password</label>
        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="password" 
        name="password"  
        id="password"
       onChange={this.onPasswordChange}/>
      </div>
    </fieldset>
    <div className="">
      <input 
      onClick={this.onSubmitRegister}
      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
      type="submit" value="Register"/>
    </div>
  </div>
</main>
</article>
);
}
}
export default Register;

