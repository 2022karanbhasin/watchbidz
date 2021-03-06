import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {Button, Header} from 'semantic-ui-react';
import Divider from '@material-ui/core/Divider'

import { List } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom'
import { AppState } from '../../context'

const useStyles = makeStyles((theme) => ({
        root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                overflow: 'hidden',
                backgroundColor: theme.palette.background.paper,
        },
        gridList: {
                flexWrap: 'nowrap',
                // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
                transform: 'translateZ(0)',
        },
        title: {
                color: theme.palette.primary.light,
        },
        titleBar: {
                background:
                        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0) 100%)',
        },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
const ClosingSoon = () => {
        const someContext = useContext(AppState);
        const { buyers, user, listed} = someContext;
        const [relevant, setRelevant] = useState([]);
        const [redirect, setRedirect]=useState(false);
        const [toLink, setToLink] = useState("");
        useEffect(()=>{
                setRelevant(Object.values(listed).filter(check=>checkShow(check)))
        }, [listed,buyers,user]);

        function checkShow(check){
                console.log(buyers[user]['current']!="None")
                // console.log(buyers[user]['current']==="None" || !Object.values(buyers[user]['current']).includes(check.id))
                console.log(buyers);
                console.log(buyers[user]);
                return check.active==true&&buyers[user]['current']&&(buyers[user]['current']=="None"||!Object.values(buyers[user]['current']).includes(check.id))
        }

        const classes = useStyles();
        if(redirect){
                return <Redirect to={`/buyer/auction/${toLink}`}></Redirect>
        }
        else if (buyers && buyers[user] && buyers[user] && listed) {
                return (
                        <div>
                        <div className={classes.root}>
                                <GridList className={classes.gridList} cols={Math.min(relevant.length,5)}>
                                {/* <GridList className={classes.gridList} cols={5}> */}

                                        {/* Object.values(sellers[user]['listed']).length */}
                                        {relevant.map((item) => (
                                                // <Link to={`/buyer/auction/${item.id}`} >
                                                <GridListTile key={listed[item.id].modelNo} onClick={()=>{
                                                        setRedirect(true);
                                                        setToLink(item.id);
                                                }}  >
                                                        <img src={listed[item.id].photoTime} alt={listed[item.id].modelNo} />
                                                        <GridListTileBar
                                                                title={listed[item.id].modelNo}
                                                                classes={{
                                                                        root: classes.titleBar,
                                                                        title: classes.title,
                                                                }}
                                                                actionIcon={
                                                                        <IconButton aria-label={`star `} 
                                                                        > 
                                                                        {/* onClick={()=><Redirect to={`/buyer/auction/${item.id}`}></Redirect>} */}
                                                                                {/* ${item.item}  */}
                                                                                <StarBorderIcon className={classes.title} />
                                                                        </IconButton>
                                                                }
                                                        />
                                                </GridListTile>
                                                // </Link>
                                        ))}
                                </GridList>
                        </div>
                        <div>
                                 <Divider />
                                {/* <Button as={Link} to={`/seller/listwatch`} variant="contained" color="primary" disableElevation>
                                        List a Watch
                                </Button> */}
                        </div>
                        </div>
                );
        }
        else {
              if(user) {
                return (
                        <div>
                                <Header>ADD BIDS THAT ARE CLOSING SOON </Header>
                                
                                <Divider hidden/>
                                <Divider />
                                <Divider hidden/>                                

                                <Button style={{marginTop:"10px"}} as={Link} to={`/buyer/inventory`} variant="contained" color="primary" disableElevation>
                                        See Inventory, Bid Now
                                </Button>
                        </div>
                )
              } 
              else{
                      return <Redirect to='/buyer/login' ></Redirect>
              }
        }
}
export default ClosingSoon;