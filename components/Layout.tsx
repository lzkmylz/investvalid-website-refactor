import React from 'react';
import { observer } from 'mobx-react';
import { Menu, Dropdown, Icon, Button } from 'antd';
import UserStore from '../stores/UserStore';
import Router from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import './styles/Layout.scss';

type Props = {
  UserStore: UserStore
}

@observer
class Layout extends React.Component<Props> {

  handleMenuClick = (e: any) => {
    switch(e.key) {
      case "products":
        Router.push("/products");
        return;
      case "donate":
        Router.push("/donate");
        return;
      case "support":
        Router.push("/support");
        return;
      case "signin":
        Router.push("/signin");
        return;
      case "logout":
        Router.push("/logout");
        return;
      case "dashboard":
        Router.push("/dashboard");
        return;
      case "reset-pw":
        Router.push("/reset-password");
        return;
      default:
        console.log("Header router key error", e);
    }
  }

  render() {
    const desktopMenu = (
      <Menu
        onClick={this.handleMenuClick}
      >
        <Menu.Item key="dashboard" >Dashboard</Menu.Item>
        <Menu.Item key="reset-pw" >Reset Password</Menu.Item>
        <Menu.Item key="logout" >Log out</Menu.Item>
      </Menu>
    );
    const mobileUnsignedMenu = (
      <Menu
        onClick={this.handleMenuClick}
      >
        <Menu.Item key="products" >Products</Menu.Item>
        <Menu.Item key="donate" >Donate</Menu.Item>
        <Menu.Item key="support" >Support</Menu.Item>
        <Menu.Item key="signin" >Sign In</Menu.Item>
        <Menu.Item key="logout" >Log Out</Menu.Item>
      </Menu>
    );

    const mobileSignedMenu = (
      <Menu
        onClick={this.handleMenuClick}
      >
        <Menu.Item key="products" >Products</Menu.Item>
        <Menu.Item key="donate" >Donate</Menu.Item>
        <Menu.Item key="support" >Support</Menu.Item>
        <Menu.Item key="dashboard" >Dashboard</Menu.Item>
        <Menu.Item key="reset-pw" >Reset Password</Menu.Item>
        <Menu.Item key="logout" >Log Out</Menu.Item>
      </Menu>
    );
    return (
      <div className="layout" >
        <Head>
          <title>InvestValid</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <header className="header-container" >
          <h1 className="header-title" >
            <Link href="/" >
              <a>InvestValid</a>
            </Link>
          </h1>
          <div className="header-menu-mobile" >
            <Dropdown
              overlay={Boolean(this.props.UserStore.accessToken) ? mobileSignedMenu : mobileUnsignedMenu}
            >
              <Button>
                <Icon type="menu" />
              </Button>
            </Dropdown>
          </div>
          <ul className="header-nav-desktop" >
            <li>
              <Link href="/products" >
                <a>Products</a>
              </Link>
            </li>
            <li>
              <Link href="donate" >
                <a>Donate</a>
              </Link>
            </li>
            <li>
              <Link href="/support" >
                <a>Support</a>
              </Link>
            </li>
          </ul>
          <div className="header-login-container-desktop" >
            {
              Boolean(this.props.UserStore.accessToken) ? (
                <div>
                  <span>Welcome, &nbsp;</span>
                  <Dropdown overlay={desktopMenu} >
                    <span className="header-login-dropdown" >
                      {this.props.UserStore.userAttributes.nickname}<Icon type="down" />
                    </span>
                  </Dropdown>
                </div>
              ) : (
                <div className="header-login-desktop" >
                  <Link href="/login" >
                    <a className="header-signin" >Sign In</a>
                  </Link>
                  <div className="header-signup-register" >
                    <Link href="/register" >
                      <a>Sign Up</a>
                    </Link>
                  </div>
                </div>
              )
            }
          </div>
        </header>
        { this.props.children }
        <footer className="footer-container" >
          <p>&copy;{new Date().getFullYear()} Author: lzkmylz</p>
          <p>lzkmylz@gmail.com</p>
        </footer>
      </div>
    );
  }
}

export default Layout;
