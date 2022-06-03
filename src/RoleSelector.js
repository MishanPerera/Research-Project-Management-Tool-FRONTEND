import React, {useEffect, useState} from 'react'
import {HashLoader} from "react-spinners";
import {Link} from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import admin from './Assets/admin.jpg';
import supervisor from './Assets/supervisor.jpg';
import panel from './Assets/panel.jpg';
import student from './Assets/student.jpg';


export default function RoleSelector() {
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        setTimeout(()=>{
            setLoading(false);
        },3000);
    },[]);

    return (
    <div className="App">
        {loading ? 
        <Box sx={{ width: '100%', maxWidth: 500 }}>
            <Typography gutterBottom variant="h3" component="div" align='center'>DEVX</Typography>
            <Typography variant="h4" color="text.secondary" align='center'>Research Management Tool</Typography>
            <br/>
            <br/>
            <Container maxWidth="sm" justifyContent="center" align='center'>
                <HashLoader loading={loading}/>
            </Container>
        </Box>:<Paper elevation={24}>
            <Grid item xs={10} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3, mt: 3 }}>
            <Box
            sx={{
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr' },
                gap: 2,
                flexWrap: 'wrap',
                    '& > :not(style)': {
                    m: 1}
            }}
            >
            <Paper elevation={16} >
                <Card sx={{ maxWidth: 345}}>
                        <CardMedia
                        component="img"
                        height="150"
                        image= {admin}
                        alt="Admin"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div" align='center'>
                            Admin
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align='justify'>
                            No one is more cherished in this world than someone who lightens the burden of another. 
                            Set impossible challenges, then catch up with them.
                        </Typography>
                        </CardContent>
                        <div className='_btn'>
                            <Link to={'/login/admin'}>
                                <button>Go<i className='fas fa-arrow-circle-right'/></button>
                            </Link>
                        </div>
                </Card>
            </Paper>
            <Paper elevation={16} >
                <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                        component="img"
                        height="150"
                        image={supervisor}
                        alt="Supervisor/Co-Supervisor"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div" align='center'>
                            Supervisor/Co-Supervisor
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align='justify'>
                            A good leader is a person who takes a little more than his share of the blame and a little less than his share of the credit.
                        </Typography>
                        </CardContent>
                        <div className='_btn'>
                            <Link to={'/login/supervisor'}>
                                <button>Go<i className='fas fa-arrow-circle-right'/></button>
                            </Link>
                        </div>
                </Card>
            </Paper>
            <Paper elevation={16} >
                <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                        component="img"
                        height="150"
                        image={panel}
                        alt="Panel Member"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div" align='center'>
                            Panel Member
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align='justify'>
                            Ability is what you’re capable of doing. Motivation determines what you do. Attitude determines how well you do it.
                        </Typography>
                        </CardContent>
                        <div className='_btn'>
                            <Link to={'/login/panel member'}>
                                <button>Go<i className='fas fa-arrow-circle-right'/></button>
                            </Link>
                        </div>
                </Card>
            </Paper>
            <Paper elevation={16} >
                <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="150"
                            image={student}
                            alt="Student"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div" align='center'>
                            Student
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align='justify'>
                            Education is the most powerful weapon you can use to change the world. 
                            The mind is not a vessel to be filled but a fire to be ignited.
                        </Typography>
                        </CardContent>
                        <div className='_btn'>
                            <Link to={'/login/student'}>
                                <button>Go<i className='fas fa-arrow-circle-right'/></button>
                            </Link>
                        </div>
                </Card>
            </Paper>
            </Box>
        </Grid>
        </Paper>}
    </div>
    )
}
