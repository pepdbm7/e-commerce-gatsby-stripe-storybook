import React from 'react'
import {Link} from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>We are a company selling products</h1>
    <p>This is a side project to learn how to use some modern technologies such as Stripe, Storybook, etc</p>
    <Link to="/products"><button type="button">Our Products</button></Link>
  </Layout>
);

export default IndexPage