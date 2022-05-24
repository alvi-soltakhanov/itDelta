import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCash, getAllImage, getOneImage, submitComment} from '../../redux/features/fetchToBackend';
import logo from '../assets/logo.png'
import styles from './MainPage.module.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 692,
    height: 706,
    bgcolor: 'background.paper',
    outline: 'none',
    borderRadius: 4,
    boxShadow: '898E99',
    p: 4,
  };

const MainPage = () => {

    // state для модального окна
    const dispatch = useDispatch();
    
    const [ comment, setComment] = useState('');

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        dispatch(clearCash())
    }

    useEffect(() => {
        dispatch(getAllImage())
    }, [dispatch])
    
    const handleClick = (id) => {
        dispatch(getOneImage(id))
        handleOpen()
    }
    
    const handleChangeTextArea = (e) => {
        setComment(e.target.value)
    }

    const submit = (id, comment) => {
        dispatch(submitComment(id, comment))
    }
    
    const allImages = useSelector(state => state.fetchToBackend.allImages);
    const activeImage = useSelector(state => state.fetchToBackend.activeImage);

    return (
        <div className={styles.MainPage}>
            <div className={styles.Header}>
                 <img className={styles.logo} src={logo} alt="" />
            </div>
            <div className={styles.Content}> 
                    {allImages?.map((item) => {
                        return (
                        <div className={styles.Card} onClick={() => handleClick(item.id)}>
                            <div className={styles.Img}>
                                <img src={item.url} alt="#" />
                            </div>
                            <div className={styles.Description}>{item.id}</div>
                        </div>
                        )
                    })}

                    <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" textAlign='center'>
                            <img className={styles.activeImage} src={activeImage?.url} alt="" />
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} textAlign='center'>
                            <div className={styles.CommetText}>Comment</div>
                            <textarea onChange={(e) => handleChangeTextArea(e)} className={styles.TextArea} cols="30" rows="10"></textarea>
                            <div className={styles.CommetTexts}>Write few sentences about the photo.</div>
                            <div className={styles.Align}><button onClick={() => submit(activeImage.id, comment)} className={styles.SubmitComment}>Save</button></div>
                        </Typography>
                        </Box>
                    </Modal>
                    </div>
            </div>
        </div>
    );
};

export default MainPage;