import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Layout from '../components/layout'

import defaultProductImg from '../images/defaultProductImg.jpg'
import gorraImage from '../images/gorraImage.jpg'


class Product extends React.Component {

  componentDidMount() {
    this.stripe = window.Stripe('pk_test_tpfWQMLMjwGL5YEMHnXtEs4Y00v8sLKy6l', {
      betas: ['checkout_beta_4'],
    })
  }

  handleSubmit(sku) {
    return event => {
      event.preventDefault()

      this.stripe
        .redirectToCheckout({
          items: [{ sku, quantity: 1 }],

          // Note that it is not guaranteed your customers will be redirected to this
          // URL *100%* of the time, it's possible that they could e.g. close the
          // tab between form submission and the redirect.
          successUrl: 'http://localhost:8000/success',
          cancelUrl: 'http://localhost:8000/canceled',
        })
        .then(function(result) {
          if (result.error) {
            console.error(result.error.message)
          }
        })
    }
  }

  render() {
    const { id, currency, price, name } = this.props

    const priceFloat = (price / 100).toFixed(2)
    const formattedPrice = Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(priceFloat)

    const imageUrl = () => {
      let featuredImage = typeof window !== "undefined" && window.location.pathname
      if(name === "gorra") featuredImage =+ gorraImage
      else featuredImage =+ defaultProductImg
      console.log({featuredImage})
      return featuredImage
    }

    return (
      <form onSubmit={this.handleSubmit(id)}>
        <h2>
          {name} ({formattedPrice})
        </h2>
        <img src={{gorraImage}} alt="product"/>
        <button type="submit">Buy Now</button>
      </form>
    )
  }
}

export default() => (
  <StaticQuery
    query={graphql`
      {
        allStripeSku {
          edges {
            node {
              id
              currency
              price
              attributes {
                name
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Layout>
        <h1 className="">Our Products</h1>
        <div style={{dispplay: "flex" }}>
          {data.allStripeSku.edges.map(({ node: sku }) => (
            <Product
              key={sku.id}
              id={sku.id}
              currency={sku.currency}
              price={sku.price}
              name={sku.attributes.name}
            />
          ))}
        </div>
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    )}
  />
)