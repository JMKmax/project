/*
* @Author: jing
* @Date:   2019-04-29 14:51:05
* @Last Modified by:   jing
* @Last Modified time: 2019-05-03 19:33:22
*/
import React,{ Component } from 'react'
import { Upload, Icon, Modal } from 'antd';

class UploadImage extends Component{
	constructor(props){
		super(props)
		this.state = {
			previewVisible: false,
			previewImage: '',
			fileList: [],
		}
		this.handleCancel = this.handleCancel.bind(this)
		this.handlePreview = this.handlePreview.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
    static getDerivedStateFromProps(props, state){
    	if(props.fileList.length > 0 && state.fileList == 0){
    		return {
    			fileList:props.fileList
    		}
    	}
    	return null;
    }
  handleCancel(){
  	this.setState({ previewVisible: false })
  }

  handlePreview(file){
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange({ fileList }){
  	this.setState({ fileList },()=>{
  		this.props.getFileList(fileList.map(file=>file.response).join(','))
  	})
  }

	render(){
		const { previewVisible, previewImage, fileList } = this.state;
		const { action,max } = this.props
	    const uploadButton = (
	      <div>
	        <Icon type="plus" />
	        <div className="ant-upload-text">Upload</div>
	      </div>
	    );
		return(
			<div className='UploadImage'>
		        <Upload
		          action={action}
		          listType="picture-card"
		          fileList={fileList}
		          onPreview={this.handlePreview}
		          onChange={this.handleChange}
		          withCredentials={true}
		        >
		          {fileList.length >= max ? null : uploadButton}
		        </Upload>
		        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
		          <img alt="example" style={{ width: '100%' }} src={previewImage} />
		        </Modal>
			</div>
		)
	}
}

export default UploadImage