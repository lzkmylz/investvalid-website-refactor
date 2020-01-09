import React from 'react';
import { observer, inject } from 'mobx-react';
import { Menu, Dropdown, Icon, Button } from 'antd';
import UserStore from '../stores/UserStore';
import Router from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

type Props = {
  UserStore: UserStore
}

@inject('UserStore')
@observer
class Layout extends React.Component<Props> {
  static getInitialProps = async ({ UserStore }: any) => {
    UserStore.initUserFromLocalStorage();
  }

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
        <header>
          <h1 className="header-title" >
            <a href="/" >InvestValid</a>
          </h1>
          <div className="header-menu mobile" >
            <Dropdown
              overlay={Boolean(this.props.UserStore.accessToken) ? mobileSignedMenu : mobileUnsignedMenu}
            >

            </Dropdown>
          </div>
        </header>

        <footer>

        </footer>
      </div>
    );
  }
}

export default Layout;
