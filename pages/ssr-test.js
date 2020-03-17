import Layout from '../components/Layout';
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
        const userList = users.map(
            user => <li key={user.id}>{user.name} , {user.phnumber},{user.regist_date}</li>
        )
        
        return (
            <Layout>
                <ul>
                    {userList}
                </ul>
            </Layout>
        );
    }
}

export default withAuthSync(SSRTest);