import User from '../models/User.js';

//@desc Register a new user


export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if( !name || !email || !password ) {
        return res.status(400).send({message: `Please fill all the fields`});
    };
    const user = await User.findOne({email});
    if(user) {
        return res.status(400).send({message: `User already exists`});
        
    };

    try {
        const newUser = await User.create({
            name,
            email,
            password,
        });
        res.status(201).send({message: `User created successfully`});
    } catch (error) {
        res.status(500).send({message: `Server error ${error}`});

    }
}