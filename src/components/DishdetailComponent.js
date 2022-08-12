import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish({dish}) {
    return (
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
    );
}
    function RenderComments({comments}) {
        const Comments = comments.map((comment) => {
            return (
                <div key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                </div>
            )
        })
        return (
          <div>
            <h4>Comments</h4>
            {Comments}
          </div>
        );
    }

    class CommentForm extends Component{
        constructor(props){
            super(props);
            this.state={
                isModalOpen: false,
                rate:'',
                name:'',
                commnet:'',
                touched:{
                    name: false,
                    commnet: false,
                }
            }
            this.toggleModal=this.toggleModal.bind(this); 
            this.handleInputChange = this.handleInputChange.bind(this);
            this.handleBlur = this.handleBlur.bind(this);
          
    }
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }


    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
          });
    }
    validate(name) {
        const errors = {
            name: '',
        };

        if (this.state.touched.name && name.length < 3)
            errors.name = 'Must be greater than 2 characters';
        else if (this.state.touched.name && name.length > 15)
            errors.name = 'Must be 15 characters or less';
        return errors;
    }
  
        render(){
            const errors = this.validate(this.state.name, this.state.comment);
            return(
                <div>
                    <button onClick ={this.toggleModal}><i class="fa fa-pencil" aria-hidden="true"></i> Submit Comment</button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <Form onSubmit={this.handleComment}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Input type="number" id="rating" name="rating" defaultValue="1"
                                    innerRef={(input) => this.rate = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="name">Your name</Label>
                                <Input type="text" id="name" name="name" placeholder="Your name"
                                    valid={errors.name === ''}
                                    invalid={errors.name !== ''}
                                    onBlur={this.handleBlur('name')}
                                    onChange={this.handleInputChange}
                                    innerRef={(input) => this.name = input}  />
                                     <FormFeedback>{errors.name}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment">Comment</Label>
                                    <Input type="textarea" id="comment" name="comment"
                                        rows="12"
                                        value={this.state.comment}
                                        onChange={this.handleInputChange}></Input>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                </div>
            )
        }
       
    }
    
    

    const  DishDetail = (props) => {
        console.log(props.dish)
        if (props.dish) {
            return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                        <CommentForm/>
                    </div>
                </div>
                </div>
            );
        } else {
          return <div></div>;
        }
    }
export default DishDetail;