import React from 'react';
import './anime.css';

const message = document.getElementById('error');  

export class SignIn extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }
    onEmailChange = (event) => {
      this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
      this.setState({signInPassword: event.target.value})
    }
     


  onSubmitSignIn = () => {  
    fetch('http://localhost:3001/signin', {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
    this.props.loadUser(user)
    this.props.onRouteChange('home');
  }  else {
 console.log('user does not exist please register first')   
  }
})
}

  render() {
const { onRouteChange } = this.props;
    return(
        <article className="br3 ba dark-gray b--black-10 mv4 w-50 center bg-transparent br3 pa3 pa4-ns mv3 ba">
    <main className="pa4 black-80">
  <div className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0" id="signin">Sign In</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6"  htmlFor="email-address">Email</label>
        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
       type="email"
       name="email-address" 
       id="email-address" 
       onChange={this.onEmailChange}
       />
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6"  htmlFor="password">Password</label>
        <input 
        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
         type="password" 
         name="password"  
         id="password"
         onChange={this.onPasswordChange}
         />
      </div>
    </fieldset>
    <div className='mv3'>
<input  
     onClick={this.onSubmitSignIn}
      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
      type="submit" 
      value="Sign in"/>
    </div>
    <div className="lh-copy mt3">
      <p onClick={() => onRouteChange('register')} className="f6 link dim black db">Register</p>
    </div>
  </div>
</main>
</article>  
  );
  } 
} 