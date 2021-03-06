
import React, { useState, useEffect, isValidElement, useContext } from 'react';
import { Grid, Form, Image, Header, Search, Popup, Rating, Card, Button, Container, Menu, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AppState } from '../context';
import HeaderBar from '../Seller/HeaderBar';
// import { Card } from '@material-ui/core';


// const mongoose = require('mongoose');
const Inventory = () => {
        const { listed, user } = useContext(AppState);
        const [relevant, setRelevant] = useState([]);
        const [filter, setFilter] = useState("All");
        const [brands, setBrands] = useState([]);
        const brands_list = ["All", "Rolex", "A Lange and Sohne", "Audemars Piguet", "Blancpain", "Breitling", "Cartier", "FP Journe", "Glashutte Original",
                "Grand Seiko", "H Moser & Cie", "Hublot", "IWC", "Jaeger LeCoultre", "Nomos Glashutte", "Omega", "Panerai",
                "Patek Philippe", "Tag Heuer", 'Tudor', "Vacheron Constantin", "Zenith"];

        function setOptions() {
                var builder = [];
                for (let i = 0; i < brands_list.length; i++) {
                        builder.push({
                                key: i,
                                value: brands_list[i],
                                text: brands_list[i]
                        });
                }
                console.log(builder);
                setBrands(builder);
        }
        useEffect(setOptions, []);
        useEffect(initializeState, [listed, filter]);

        function initializeState() {
                let temp = [];
                Object.keys(listed).map(id => {
                        if ((filter == "All" || filter == listed[id]['manufacturer'])&&listed[id]['active']==true) {
                                temp.push(id);
                        }
                })
                setRelevant(temp);
        }

        
        const ReturnWatchCard = ({ id }) => {
                var img = listed[id]['photoCrown'];
                if (img) {
                        //      console.log(imageurl);
                        return (


                                <Popup
                                        trigger={
                                                // mobile={8} tablet={4} computer={} id={id}
                                                <Card key={id.toString()} >
                                                        {/* <Link to={`/track/${[id]}`} > */}

                                                        <Image size='medium' centered rounded verticalAlign='middle' src={img} />
                                                        <Card.Content>
                                                                <Header textAlign='center'>{listed[id]['manufacturer']} {listed[id]['modelNo']}</Header>
                                                                <Card.Meta>Starting at ${listed[id]['minimumAsk']}</Card.Meta>
                                                        </Card.Content>
                                                        <Card.Content extra>
                                                                {listed[id]['boxBool'] ? "Has " : "Does not have"} papers from  {listed[id]['manufacturer']}
                                                        </Card.Content>
                                                        {/* </Link> */}
                                                        <br></br>
                                                </Card>
                                        }
                                >
                                        <Popup.Header>See more </Popup.Header>
                                        {/* from {listed[id]['lister']} */}
                                        {/* <Popup.Content>
                                                 <Rating icon='star' defaultRating={3} maxRating={4} /> 
                                        </Popup.Content> */}
                                </Popup>);
                }
                else {
                        // console.log(imageurl)
                        return null;
                }
        }


        //      console.log(artistnames)
        return (
                <div>
                        <Container>
                                <Header size='huge'>Inventory</Header>
                                <Grid padded centered>
                                        <Grid.Row>
                                                <Grid.Column floated='right' >
                                                        <Form>
                                                                <Form.Select
                                                                        text={filter}
                                                                        options={brands}
                                                                        label="Filter Brands "
                                                                        // simple item
                                                                        onChange={(e, { value }) => setFilter(value)}
                                                                >
                                                                </Form.Select>
                                                        </Form>
                                                </Grid.Column>
                                        </Grid.Row>

                                        <Card.Group itemsPerRow={Math.min(relevant.length, 3)}>
                                                {relevant.length > 0 ? relevant.map(id => <ReturnWatchCard key={id.toString()} id={id} />) : ""}

                                        </Card.Group>
                                </Grid>
                        </Container>

                </div>

        )
}

export default Inventory;

//  const ReturnWatch = ({ id }) => {
//         var img = listed[id]['photoCrown'];
//         if (img) {
//                 //      console.log(imageurl);
//                 return (
//                         <Grid.Column key={id.toString()} mobile={8} tablet={4} computer={84} id={id}>
//                                 {/* <Link to={`/track/${[id]}`} > */}

//                                 <Image size='medium' rounded verticalAlign='middle' src={img} />

//                                 <Header textAlign='center' size='huge'>{listed[id]['modelNo']}</Header>
//                                 {/* </Link> */}
//                                 <br></br>
//                         </Grid.Column>);
//         }
//         else {
//                 // console.log(imageurl)
//                 return null;
//         }
// // }