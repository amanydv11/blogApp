import express from 'express'
import { updateUser,deleteUser, signout,getUsers, getUser } from '../controller/userController.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.get('/test',(req,res)=>{
    res.json({message:'Api is working'})
});
router.put('/update/:userId',verifyToken,updateUser);
router.delete('/delete/:userId',verifyToken,deleteUser)
router.post('/signout',signout)
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser);

export default router;