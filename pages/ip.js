import React, { Fragment } from 'react'
import MUIDataTable from "mui-datatables";
import { withAuthSync } from '../utils/auth'
import axios from 'axios';

class get_ip extends React.Component {
    static async getInitialProps ({req}) {
        const response = await axios.get('http://127.0.0.1:8111/api/ip');
        return {
            data: response.data
        }
    }

    render() {
        
        const { data } = this.props;
        
        return (
            <Fragment>
                <div>
                    {data}
                </div>
        </Fragment>
        );
    }
}

export default withAuthSync(get_ip);