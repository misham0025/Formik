import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';




function Signin() {
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            email: '',
            gender: '',
            role: ''
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .required('Required'),
            password: Yup.string()
                // .min(8, 'Must be 8 characters or less')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                )
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            gender: Yup.string().required('Select gender'),
            role: Yup.string().required('Select role')
        }),
        onSubmit: async (values, { resetForm }) => {
            let res = JSON.stringify(values, null, 2);
            console.log(res)
            await axios.post('https://63ad6ce33e4651691659b7ff.mockapi.io/shibinn', values)
            handleOpen()
            setTimeout(() => { navigate("/todo") }, 1000)
            resetForm({ values: '' })

        },
    });


    return (
        <div className='wrapper'>
            <div className="hero">
                <div className="head">
                    <h2>SIGN IN</h2>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="input">
                        <TextField label='Username' fullWidth
                            id="username"
                            name="username"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                        /><span className='required'>
                            {formik.touched.username && formik.errors.username ? (
                                <div>{formik.errors.username}</div>
                            ) : null}</span>
                    </div>
                    <div className="input">
                        <TextField label='Email ID' fullWidth
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        /><span className='required'>
                            {formik.touched.email && formik.errors.email ? (
                                <div>{formik.errors.email}</div>
                            ) : null}</span>
                    </div>
                    <div className="input">
                        <TextField label='Password' fullWidth
                            id="password"
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        /><span className='required'>
                            {formik.touched.password && formik.errors.password ? (
                                <div>{formik.errors.password}</div>
                            ) : null}</span>
                    </div>
                    <div className="input">
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                id="gender"
                                name="gender"
                                type="radio"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.gender}
                            >
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                        <span className='required'>
                            {formik.touched.gender && formik.errors.gender ? (
                                <div>{formik.errors.gender}</div>
                            ) : null}</span>
                    </div>


                    <div className="input">


                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select
                                id="role"
                                name="role"
                                type="dropdown"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.role}
                                label='Role'
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="super_admin">Super Admin</MenuItem>
                                <MenuItem value='staff'>Staff</MenuItem>
                            </Select>
                        </FormControl><span className='required'>
                            {formik.touched.role && formik.errors.role ? (
                                <div>{formik.errors.role}</div>
                            ) : null}</span>
                    </div>



                    <div className="button">
                        <Button variant="contained" type='submit' size="large">
                            SUBMIT
                        </Button>


                    </div>


                 

                </form>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Typography id="modal-modal-description" sx={{ mt: 2, mx: 6 }}>
                        <div className='button'>
                            <img width={50} src="https://www.freeiconspng.com/uploads/success-icon-10.png" alt="" />

                        </div>
                        <span className='button1'>User Successfully Added</span>
                    </Typography>
                </Box>
            </Modal>

        </div>
    )
}

export default Signin
