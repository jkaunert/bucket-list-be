const db = require("../../data/dbConfig");

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUserById,
    getUserByEmail,
}

async function registerUser(user) {

    if (process.env.NODE_ENV === "production"){
        const [newUser] = await db('users').insert(user, ["id"]);
        return newUser.id;
    }
    const [id] = await db('users').insert(user);

    return id;
}

function loginUser(email) {
    return db('users')
    .where({email})
    .first();
}

function getUsers(){
    return db('users')
    .select('id', 'name', 'email', 'created');
}

function getUserById(id){
    return db('users')
    .select('id', 'name', 'email', 'created')
    .where({ id })
    .first();
}


function getUserByEmail(email){
    return db('users')
    .select('id', 'name', 'email', 'created')
    .where({ email })
    .first();
}
 