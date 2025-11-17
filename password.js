const bcrypt = require('bcryptjs');

var hashCode;

async function encryptPassword(password){
    // Encrypt the plain text: "myPassword123"
    let hash = await bcrypt.hash(password,10) // Encrypt the password: "myPassword123" using a "salt" value, generated using 10 rounds
    hashCode = hash

    // TODO: Store the resulting "hash" value in the DB
    console.log(`Hash: ${hash}`)
}

function decryptPassword(password){

    try{        
        // Pull the password "hash" value from the DB and compare it to "myPassword123" (match)
        bcrypt.compare(password, hashCode).then((result) => {
            // result === true
            console.log(`User is Valid: ${result}`)
        });

        // // Pull the password "hash" value from the DB and compare it to "myPasswordABC" (does not match)
        // bcrypt.compare("myPasswordABC", hashCode).then((result) => {
        //     // result === false
        //     console.log(`User is Valid: ${result}`)
        // });
        
    }catch(error){
        console.log(`Error : ${error}`)
    }

}


encryptPassword("myPassword123").then(s=>{
    console.log("success")
    decryptPassword("myPassword123")
    decryptPassword("myPassword")
})