import bcrypt from 'bcrypt';

const verified = (plainPassword, hashPassword)=>{
    return bcrypt.compare(plainPassword, hashPassword)
}

export default verified;