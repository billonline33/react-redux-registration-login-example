import React from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

const Profile = () => {
  return (
    <div>
      <h2>Profile</h2>
    </div>
  );
};

const Setting = () => {
  return (
    <div>
      <h2>Setting</h2>
    </div>
  );
};

const Account = () => {
  return (
    <div>
      <h2>Account</h2>
    </div>
  );
};

class HomePage extends React.Component {
  componentDidMount() {
    //this.props.getUsers();
  }

  handleDeleteUser(id) {
    return e => this.props.deleteUser(id);
  }

  render() {
    const { user, users } = this.props;
    return (
      <div className="col-md-6 col-md-offset-3">
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/setting">Setting</Link>
          </li>
          <li>
            <Link to="/account">Account</Link>
          </li>
        </ul>
        <h1>Hi {user.firstName}!</h1>
        <p>You're logged in with React!!</p>
        <Route path="/profile" component={Profile} />
        <Route path="/setting" component={Setting} />
        <Route path="/account" component={Account} />
        <h3>All registered users:</h3>
        {users.loading && <em>Loading users...</em>}
        {users.error && (
          <span className="text-danger">ERROR: {users.error}</span>
        )}
        {users.items && (
          <ul>
            {users.items.map((user, index) => (
              <li key={user.id}>
                {user.firstName + ' ' + user.lastName}
                {user.deleting ? (
                  <em> - Deleting...</em>
                ) : user.deleteError ? (
                  <span className="text-danger">
                    {' '}
                    - ERROR: {user.deleteError}
                  </span>
                ) : (
                  <span>
                    {' '}
                    - <a onClick={this.handleDeleteUser(user.id)}>Delete</a>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
        <p>
          <Link to="/login">Logout</Link>
        </p>
      </div>
    );
  }
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
