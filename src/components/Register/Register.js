import React from 'react';
import validator from 'validator';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerName: "",
      registerEmail: "",
      registerPassword: "",
    };
  }

  onNameChange = (event) => {
    this.setState({ registerName: event.target.value });
  }

  onEmailChange = (event) => {
    this.setState({ registerEmail: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ registerPassword: event.target.value });
  }

  onSubmitRegister = () => {
    const { registerName, registerEmail, registerPassword } = this.state;
    if (registerName && validator.isEmail(registerEmail) && registerPassword) {
      fetch("https://young-lake-92533.herokuapp.com/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: registerEmail,
          name: registerName,
          password: registerPassword,
        })
      })
        .then(res => res.json())
        .then(user => {
          if (user.id) {
            this.props.loadUser(user);
            this.props.onRouteChange("home");
          }
        })
        .catch(err => console.log("could not register"));
    }
  }
  render() {
    return (
      <article className="br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center v-mid">
        <main className="pa4 white-80">
          <div className="measure center">
            <fieldset
              id="sign_up"
              className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label
                  className="db fw6 lh-copy f6"
                  htmlFor="name">Name</label>
                <input
                  onChange={this.onNameChange}
                  className="pa2 input-reset ba white bg-black hover-bg-white hover-black w-100"
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <div className="mt3">
                <label
                  className="db fw6 lh-copy f6"
                  htmlFor="email-address">Email</label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba white bg-black hover-bg-white hover-black w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label
                  className="db fw6 lh-copy f6"
                  htmlFor="password">Password</label>
                <input
                  onChange={this.onPasswordChange}
                  className="b pa2 input-reset ba white bg-black hover-bg-white hover-black w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitRegister}
                className="b ph3 pv2 input-reset ba b--white bg-transparent white pointer f6 dib"
                type="submit"
                value="Register" />
            </div>
          </div>
        </main>
      </article>
    )
  }
}

export default Register
