import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert } from 'reactstrap'

import { newPost } from '../../../actions/posts/postsAction'
import { clearErrors } from '../../../actions/error/errorAction'

export class NewPost extends Component {

    state = {
        modal: false,
        title: '',
        body: '',
        msg: null
    }

    componentDidUpdate(prevProps) {

        const { error } = this.props

        if (error !== prevProps.error) {
            //Check for adding post error
            if (error.id === "ADDPOST_FAIL") {
                this.setState({ msg: error.msg.msg })
            } else {
                this.setState({ msg: null })
            }
        }

        // If successfully added, close modal
        if (this.state.modal) {
            if (prevProps.posts.length !== this.props.posts.length) {
                this.toggle()
            }
        }
    }

    toggle = () => {

        this.props.clearErrors()

        this.setState({
            title: '',
            body: '',
            modal: !this.state.modal
        })
    }

    onSubmit = (e) => {

        e.preventDefault()

        const newPost = {
            title: this.state.title,
            body: this.state.body
        }

        this.props.newPost(newPost)
    }

    onChange = (e) => {

        this.setState({
            [e.target.name] : e.target.value
        })

    }

    render() {

        return (
            <div>
                <Button color="success" size="sm" className="mb-3" onClick={this.toggle}>+ Add your Post</Button> 
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Create Your Post
                    </ModalHeader>
                    { this.state.msg ? <Alert color='danger'>{ this.state.msg }</Alert> : null }
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label>Title</Label>
                                <Input type="text" name="title" value={this.state.title} onChange={this.onChange} placeholder="Post title goes here" /><br />
                                <Label>Content</Label>
                                <Input type="textarea" name="body" value={this.state.body} onChange={this.onChange} placeholder="Post content goes here" /><br />
                                <Button color="success" className="mt-2" block>Create</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    error: state.error,
    posts: state.posts.postItems
})

NewPost.propTypes = {
    newPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired
}

export default connect(mapStateToProps, {newPost, clearErrors})(NewPost)
