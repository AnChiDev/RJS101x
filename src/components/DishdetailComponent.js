import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import dateFormat from "dateformat";

class DishDetail extends Component{
    render(){
       if(typeof this.props.dish !=='undefined' ){
        const dish = this.props.dish;
        const comments = dish.comments.map((comment) => {
            return (
                <div class ="container">
                <div key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                </div>
                </div>
            )
        })
        return(
     
            <div className ="container">
                <div class="row">       
                <div className ="col-12 col-md-5 m-1">
                    <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                                <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                                </CardBody>
                    </Card>          
                </div>
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments}
                </div>
            </div>
            </div>
    )}
    else{
        return(
            <div></div>
        )
    }}
}
export default DishDetail;