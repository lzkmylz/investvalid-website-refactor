import React from 'react';
import { Breadcrumb } from 'antd';

type Props = {
  PageName: string,
}

const ProductBreadcrumb: React.FC<Props> = (props: Props) => (
  <div className="breadcrumb-container" >
    <Breadcrumb
    >
      <Breadcrumb.Item>
        <a href="/">Home</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="/products">Products</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{props.PageName}</Breadcrumb.Item>
    </Breadcrumb>
    <style jsx >{`
      @media screen and (min-width: 768px) {
        .breadcrumb-container {
          width: 750px;
          position: relative;
          margin: 0 auto;
          text-align: left;
          font-size: 18px;
        }
      }
    `}</style>
  </div>
);

export default ProductBreadcrumb;
