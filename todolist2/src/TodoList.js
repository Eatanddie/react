import React, { Component } from 'react'
import { connect } from 'react-redux'

const TodoList = (props) => {
    const { inputValue, changeInputValue, handleClickBtn, list, handleDeleteItem } = props
    return (
        <div>
            <div>
                <input value={inputValue} onChange={changeInputValue} type="text" placeholder="请输入" />
                <button onClick={handleClickBtn}>提交</button>
            </div>
            <ul>
                {
                    list.map((item, index) => {
                        return <li key={index} onClick={handleDeleteItem.bind(this, index)}>{item}</li>
                    })
                }
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        inputValue: state.inputValue,
        list: state.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeInputValue(e) {
            const action = {
                type: 'change_input_value',
                value: e.target.value
            }
            dispatch(action)
        },
        handleClickBtn() {
            const action = {
                type: 'add_todo_item'
            }
            dispatch(action)
        },
        handleDeleteItem(index) {
            const action = {
                type: 'delete_todo_item',
                index
            }
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
