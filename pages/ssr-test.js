import React, { Fragment } from 'react'
import { withAuthSync } from '../utils/auth'
import axios from 'axios';

class SSRTest extends React.Component {
    static async getInitialProps ({req}) {
        const response = await axios.get('http://127.0.0.1:8111/api/get_list');
        return {
            users: response.data
        }
    }

    render() {
        const { users } = this.props;
        console.log(users);
        const userList = users.map(
            user => <li key={user.id}>{user.name} , {user.phnumber},{user.regist_date}</li>
        )
        
        return (
            <Fragment>
                <ul>
                    {userList}
                </ul>
            </Fragment>
        );
    }
}

export default withAuthSync(SSRTest);