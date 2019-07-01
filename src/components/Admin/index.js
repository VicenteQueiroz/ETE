import React, { Component } from "react";
import { withFirebase } from "../Firebase";

class AdminPage extends Component {
  constructor(props) {
    super(props);
  }
  state = { loading: false, users: [] };

  componentDidMount() {
    this.setState({ loading: true });

    // We are using the users reference from our Firebase class to attach a listener.
    // The listener is called on(), which receives a type and a callback function.
    // The on() method registers a continuous listener that triggers every time something has changed,
    // the once() method registers a listener that would be called only once

    this.props.firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));
      this.setState({ users: usersList, loading: false });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>

        {loading && <div>Loading...</div>}

        {
          <ul>
            {users.map(user => (
              <li key={user.uid}>
                <span>
                  <strong>ID: </strong> {user.id}
                </span>
                <span>
                  <strong>E-mail: </strong> {user.email}
                </span>
                <span>
                  <strong>Username: </strong> {user.username}
                </span>
              </li>
            ))}
          </ul>
        }
      </div>
    );
  }
}

export default withFirebase(AdminPage);
