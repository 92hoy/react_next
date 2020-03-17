import Link from 'next/link'
import { logout } from '../utils/auth'

const linkStyle = {
    marginRight: '1rem'
}
const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link href="/"><a style={linkStyle}>HOME</a></Link>
                    </li>
                    <li>
                        <Link href="/about"><a style={linkStyle}>소개</a></Link>
                    </li>
                    <li>
                        <Link prefetch href="/ssr-test"><a style={linkStyle}>SSR 테스트</a></Link>
                    </li>
                    <li>
                        <Link href="/login">
                            <a>Login</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/profile">
                            <a>Profile</a>
                        </Link>
                    </li>
                    <li>
                        <button onClick={logout}>Logout</button>
                    </li>
                </ul>
            </nav>
            <style jsx>{`
      ul {
        display: flex;
        list-style: none;
        margin-left: 0;
        padding-left: 0;
      }
      li {
        margin-right: 1rem;
      }
      li:first-child {
        margin-left: auto;
      }
      a {
        color: #fff;
        text-decoration: none;
      }
      header {
        padding: 0.2rem;
        color: #fff;
        background-color: #333;
      }
    `}</style>
        </header>
    );
};

export default Header;