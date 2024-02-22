import { usersDao } from "../DAL/DAO/mongodb/users.dao.js";
import { hashData } from "../utils.js";

export const findAll = async () => {
    const users = await usersDao.findAll();
    return users;
};

export const findById = async (id) => {
    const user = await usersDao.findById(id);
    return user;
};

export const findByEmail = async (email) => {
    const user = await usersDao.findByEmail(email);
    return user;
};

export const createOne = async (obj) => {
    const hashedPassword = hashData(obj.password);
    const newObj = { ...obj, password: hashedPassword, cart: createdCart._id, role: 'user'};
    const createdUser = await usersDao.createOne(newObj);
    return createdUser;
};

export const updateOne = async (id, obj) => {
    const response = await usersDao.updateOne(id, obj);
    return response;
};

export const deleteOne = async (id) => {
    const response = await usersDao.deleteOne(id);
    return response;
};

export const saveUserDocumentsService = async ({idUser, dni, address, bank, products}) => {
    //return "Saved";
    const id = idUser;
    const saveDocuments = await usersDao.updateOne(id, 
    {
        documents:[
            {
                name: 'dni',
                reference: dni[0].path,
            },
            {
                name: 'address',
                reference: address[0].path,
            },
            {
                name: 'bank',
                reference: bank[0].path,
            },
            {
                name: 'products',
                reference: products[0].path,
            }
        ],
    });
    return saveDocuments;
};

export const saveUserProfilesService = async ({idUser, profiles}) => {
    const id = idUser;
    const saveProfiles = await usersDao.updateOne(id, 
    {
        profiles:[
            {
                name: 'profiles',
                reference: profiles[0].path,
            }
        ]
    });
    return saveProfiles;
};

export const saveUserProductsService = async ({ idUser, products }) => {
    const id = idUser;
    const productReferences = products.map(product => ({
        name: 'product', 
        reference: product.path 
    }));

    // Using updateOne instead of findByIdAndUpdate
    const saveProducts = await usersDao.updateOne(id, {
        $set: { products: productReferences }
    });

    // Since updateOne doesn't return the updated document by default,
    // you might want to fetch the updated user separately if needed.
    const updatedUser = await usersDao.findById(id);

    return updatedUser; // Or return saveProducts based on your requirements.
};