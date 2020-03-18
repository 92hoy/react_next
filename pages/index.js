import Link from 'next/link'
import { withAuthSync } from '../utils/auth'
import Head from 'next/head';
import { Fragment } from 'react';


const Index = () => (
    <Fragment>
        <Head>
            <title>
                Index 페이지
            </title>
        </Head>
        <h1>
            안녕, Next.js
        </h1>
        <h2>
            <Link href="/about">
                <a style={{background: 'black', color: 'white'}}>소개</a>
            </Link>
        </h2>
    </Fragment>
);

export default withAuthSync(Index);