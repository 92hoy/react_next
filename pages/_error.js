import React from 'react'
import Layout from '../components/Layout'
import NotFoundFailure from '../components/NotFoundFailure'

const Error = ({ statusCode }) => {
  const getErrorModule = () => {
    console.log(statusCode, 'in Error stsatuscode')
    switch (statusCode) {
      case 404:
        return <NotFoundFailure />
      case 500:
        return <NotFoundFailure />
      default:
        return <NotFoundFailure />
    }
  }
  return (
    <Layout header="GnbWrapBackward" title="" hideFooter={true}>
      {getErrorModule()}
    </Layout>
  )
}

Error.getInitialProps = ({ res, err }) => {
  // console.log(res.statusCode, err.statusCode, 'reserr')
  let statusCode
  if(res) {
    statusCode = res.statusCode
  } else if(err) {
    statusCode = err.statusCode
  } else {
    statusCode = 404
  }
  return { statusCode }
}

export default Error