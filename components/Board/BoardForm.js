import React, { Component } from 'react';

class contextForm extends Component {
  state = {
    title: '',
    context: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.title]: e.target.value
    })
  }
  handleSubmit = (e) => {
    // 페이지 리로딩 방지
    e.preventDefault();
    // 상태값을 onCreate 를 통하여 부모에게 전달
    this.props.onCreate(this.state);
    // 상태 초기화
    this.setState({
      title: '',
      context: ''
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="제목"
          value={this.state.title}
          onChange={this.handleChange}
          title="title"
        />
        <input
          placeholder="내용"
          value={this.state.context}
          onChange={this.handleChange}
          title="context"
        />
        <button type="submit">등록</button>
      </form>
    );
  }
}

export default contextForm;