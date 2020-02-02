import React from 'react';
import {
  Avatar,
  Button,
  Modal,
  Upload,
  Icon,
  message,
} from 'antd';
import Router from 'next/router';
import Layout from '../components/Layout';
import { UploadChangeParam } from 'antd/lib/upload'
import { observer, inject } from 'mobx-react';
import UserStore from '../stores/UserStore';

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

type Props = {
  UserStore: UserStore
}

@inject('UserStore')
@observer
class Dashboard extends React.Component<Props> {
  state = {
    visible: false,
    confirmLoading: false,
    previewVisible: false,
    previewImage: '',
    fileList: [],
    file: null,
    filetype: null,
    uploadError: false,
  }

  componentWillUnmount = () => {
    if(!Boolean(this.props.UserStore.accessToken)) {
      Router.push("/");
    }
  }

  handleCancelPreview = () => {
    this.setState({ previewVisible: false });
  }

  handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = async (info: UploadChangeParam) => {
    let data = await getBase64(info.fileList[0].originFileObj);
    this.setState({ file: data, filetype: info.file.type, fileList: info.fileList });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    const file: string | null = this.state.file;
    const filetype: string | null = this.state.filetype;
    if(file == null || filetype == null) {
      message.error("Please upload new avatar or cancel");
      return;
    }
    this.setState({
      confirmLoading: true,
    });

    this.props.UserStore.UpdateAvatar(file, filetype)
      .then(data => {
        this.props.UserStore.UpdateS3Avatar(data.data.data).then(() => {
          this.setState({ confirmLoading: false, visible: false });
          Router.push('/dashboard');
        }, err => {
          this.setState({ confirmLoading: false, visible: false });
          message.error(err.message);
        });
      });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handlePreviewCancel = () => {
    this.setState({ previewVisible: false });
  }

  handleUploadAvatar = () => {
    return false;
  }

  render() {
    const {
      visible,
      confirmLoading,
      previewImage,
      previewVisible,
      fileList,
    } = this.state;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload New Avatar</div>
      </div>
    );

    return (
      <Layout UserStore={this.props.UserStore} >
        <Modal
          title="Upload New Avatar"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <div className="avatar-modal-main" >
            <Upload
              accept=".jpg,.png"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
              beforeUpload={this.handleUploadAvatar}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </div>
        </Modal>
        <Modal visible={previewVisible} footer={null} onCancel={this.handlePreviewCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>

        <div className="main-content" >
          <div className="dashboard-user-profile" >
            <div className="dashboard-user-avatar" >
              <Avatar
                size={128}
                src={
                  this.props.UserStore.userAvatarBase64 ?
                  `data:image/${this.props.UserStore.userAttributes.s3_avatar_url.split('.')[1]};base64,${this.props.UserStore.userAvatarBase64}` :
                  'user'
                }
              />
              <Button
                type="primary"
                size="small"
                onClick={this.showModal}
                className="dashboard-user-avatar-setter"
              >
                Set Avatar
              </Button>
            </div>
            <div className="user-info" >
              <p>Email: {this.props.UserStore.userAttributes.email}</p>
              <p>Name: {this.props.UserStore.userAttributes.nickname}</p>
            </div>
          </div>
        </div>
        <style jsx >{`
          .dashboard-user-profile {
            display: flex;
            flex-direction: row;
            height: 200px;
            margin: 0 40px;
            border: 1px solid #fff;
            align-items: center;
          }
          @media screen and (min-width: 426px) {
            .dashboard-user-avatar {
              display: flex;
              flex-direction: column;
              flex: 1;
              justify-content: center;
              align-items: center;
              text-align: center;
            }
            .dashboard-user-avatar-setter {
              margin-top: 10px;
            }
            .user-info {
              flex: 2;
              justify-content: center;
              align-items: center;
              text-align: center;
            }
          }
          .ant-upload-picture-card-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
        `}</style>
      </Layout>
    )
  }
}

export default Dashboard;
