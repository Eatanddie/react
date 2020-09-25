import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd'
import store from './store'
import { getInputChangeAction, getAddItemAction, getDeleteItemAction } from './store/actionCreators'

class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = store.getState()
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleStoreChange = this.handleStoreChange.bind(this)
        this.handleClickBtn = this.handleClickBtn.bind(this)
        store.subscribe(this.handleStoreChange)
    }

    handleStoreChange() {
        this.setState(store.getState())
    }

    handleClickBtn() {
        const action = getAddItemAction()
        store.dispatch(action)
    }

    handleInputChange(e) {
        const action = getInputChangeAction(e.target.value)
        store.dispatch(action)
    }

    handleItemDelete(index) {
        const action = getDeleteItemAction(index)
        store.dispatch(action)
    }

    render() {
      return (
        <div>
            <div style={{margin: '10px'}}>
                <Input value={this.state.inputValue} onChange={this.handleInputChange} placeholder="请输入" style={{width: '300px', marginRight: '10px'}} />
                <Button type="primary" onClick={this.handleClickBtn}>提交</Button>
            </div>
            <List
                style={{width: '300px', marginLeft: '10px'}}
                bordered
                dataSource={this.state.list}
                renderItem={(item, index) => (
                    <List.Item onClick={this.handleItemDelete.bind(this, index)}>{item}</List.Item>
                )}
            />
        </div>
      );
    }
}

export default TodoList;
