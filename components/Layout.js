import Header from './Header';

const Layout = ({children}) => (
    <div className='layout'>
        <Header/>
        {children}
    </div>
);

export default Layout;