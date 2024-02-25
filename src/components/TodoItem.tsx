import React, { useState } from "react";
import '../styles/TodoItem.css';
import { Button, Form } from 'react-bootstrap';

interface TodoItemProps {
    inputValue: string,
    onDelete: (id: number) => void,
    onEdit: (id: number, newText: string) => void,
    id: number
}

const TodoItem = ({ inputValue, onDelete, onEdit, id }: TodoItemProps) => {
    const [isCompleted, setIsCompleted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(inputValue);

    const handleCompleteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsCompleted(e.currentTarget.checked);
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        completeEdit();
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const completeEdit = () => {
        onEdit(id, editText);
        setIsEditing(false);
    };

    const cancelEdit = () => {
        setEditText(inputValue);
        setIsEditing(false);
    };

    return (
        <div
            className="itemContainer"
            style={{ backgroundColor: isCompleted ? 'grey' : 'white' }}
        >
            <div className="itemTop">
                <div className="text">
                    {isEditing ?
                        <Form onSubmit={handleSubmit}>
                            <Form.Control
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)} />
                        </Form>
                        : <span>
                            {isCompleted ? inputValue + "     ✅" : inputValue}
                        </span>}
                </div>
                {isEditing ?
                    <Form.Check
                        disabled
                        className="switch"
                        type="switch"
                        id={`complete-switch-${inputValue}`}
                        checked={isCompleted}
                        onChange={handleCompleteChange}
                    /> : <Form.Check
                        className="switch"
                        type="switch"
                        id={`complete-switch-${inputValue}`}
                        checked={isCompleted}
                        onChange={handleCompleteChange}
                    />}
            </div>
            <div className="itemBottom">
                {isEditing ?
                    <Button
                        variant="outline-danger"
                        onClick={cancelEdit}>취소</Button>
                    : <Button
                        variant="outline-danger"
                        onClick={() => onDelete(id)}>삭제</Button>}
                {isEditing ?
                    <Button
                        variant="outline-success"
                        onClick={completeEdit}>저장</Button>
                    : <Button
                        variant="outline-warning"
                        disabled={isCompleted}
                        onClick={handleEdit}>수정</Button>}
            </div>
        </div>
    );
};

export default TodoItem;
