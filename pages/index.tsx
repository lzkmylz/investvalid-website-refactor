import React from 'react'
import { observer, inject } from 'mobx-react';
import Layout from '../components/Layout'
import Link from 'next/link';
import UserStore from '../stores/UserStore';
import { Button } from 'antd';
const Fade = require('react-reveal/Fade');

type Props = {
  UserStore: UserStore
}

@inject('UserStore')
@observer
class Index extends React.Component<Props> {

  render() {
    return (
      <Layout UserStore={this.props.UserStore} >
        <div className="main-content" >
          <div className="title-content-container" >
            <Fade bottom={true} >
              <h1 className="title-font" >Make Best Invest Decision</h1>
            </Fade>
            <Fade delay={1000} bottom={true} >
              <h1 className="title-font" >With Invest Valid</h1>
            </Fade>
            <Fade delay={2000} bottom={true} >
              <p className="title-content" >We Use Big Data And Morden Finance Theory To Valid Your Investment And Get Better Return.</p>
            </Fade>
            <Button type="primary" size="large" className="title-getstart-btn" >
              <Link href={Boolean(this.props.UserStore.accessToken) ? "/dashboard" : "/login"} >
                <a>Get Start</a>
              </Link>
            </Button>
          </div>
          <div className="index-product-container" >
            <div className="center-img" >
              <img className="stock-analysis-img" src='/static/index-analys.jpg' alt="stock data analysis" />
            </div>
          </div>
        </div>
    <style jsx >{`
      .title-content-container {
        margin: 2rem 1rem 2rem;
        text-align: center;
      }
      .title-font {
        margin: 20px 0;
        font-size: 28px;
        font-family: 'Eina01-Bold', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }
      .title-content {
        font: 400 16px/1.5 system-ui,-apple-system,BlinkMacSystemFont,"Helvetica Neue",Helvetica,Arial,sans-serif;
      }
      .title-getstart-btn {
        margin-top: 20px;
      }
      .stock-analysis-img {
        width: 300px;
        height: 235px;
      }
    `}</style>
      </Layout>
    )
  }
}

export default Index;
