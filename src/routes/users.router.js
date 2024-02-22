import { Router } from "express";
import {
    findUsers,
    findUser,
    deleteUser,
    createUser,
    updateUser,
    findUserByEmail,
    changeRole,
    saveUserDocuments,
    saveUserProfiles
} from "../controllers/users.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/", findUsers);
router.get("/:idUser", findUser);
router.delete("/:idUser", deleteUser);
router.post("/", createUser);
router.put("/:idUser", updateUser); 
router.get("/email/:email", findUserByEmail); 
router.post("/premium/:idUser", changeRole);
router.post("/:idUser/documents", 
    upload.fields([
        {name: "dni", maxCount: 1},
        {name: "address", maxCount: 1},
        {name: "bank", maxCount: 1},
        {name: "products", maxCount: 3}
    ]), 
    saveUserDocuments
);
router.post("/:idUser/profiles", 
    upload.fields([
        {name: "profiles", maxCount: 1}
    ]), 
    saveUserProfiles
);


export default router;
