import React, { Component } from 'react'
class ErrorCatcher extends Component {
	constructor(props) {
		super(props);
		this.state = {hasError: false};
	}

	componentDidCatch(error, info) {
		this.setState({hasError: true});
	}

	render() {
		if (this.state.hasError) {
  return <div className='center mt4 animated bounceIn' id="error" style={{backgroundColor: 'tomato', color: 'gold', display:'none'}}>  
 <p>this user does not exist.<br/>
 please register first</p></div> 
 } 
 	return this.props.children;
 }
}
export default ErrorCatcher;     
