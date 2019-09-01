import React, { Component } from 'react';

const AuthContext = React.createContext();

class AuthProvider extends Component {
  state = {
    isLogin: false
  };

  logIn = () => this.setState({ isLogin: true });
  logOut = () => this.setState({ isLogin: false });
  render() {
    return (
      <AuthContext.Provider
        value={{ ...this.state, logIn: this.logIn, logOut: this.logOut }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
const AuthConsumer = AuthContext.Consumer;

// export function withAuthConsumer(Component) {
//   return function ConsumerWrapper(props) {
//     return (
//       <AuthConsumer>
//         {value => <Component {...props} context={value} />}
//       </AuthConsumer>
//     );
//   };
// }

export { AuthContext, AuthProvider, AuthConsumer };
