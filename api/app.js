const express = require('express')
var cors = require('cors')
const fs = require('fs')
const schedule = require('node-schedule');

const app = express()

//this line is required to parse the request body
app.use(express.json())
app.use(cors())

var reset = false;  // set to true to clear the stars at a set day/time

/* Create - POST method */
app.post('/user/add', (req, res) => {
    //get the existing user data
    const existUsers = getUserData()
    
    //get the new user data from post request
    const userData = req.body

    //check if the userData fields are missing
    if (userData.name == null || userData.stars == null ) {
        return res.status(401).send({error: true, msg: 'User data missing'})
    }
    
    //check if the name exist already
    const findExist = existUsers.find( user => user.name === userData.name )
    if (findExist) {
        return res.status(409).send({error: true, msg: 'name already exist'})
    }

    //append the user data
    existUsers.push(userData)

    //save the new user data
    saveUserData(existUsers);
    res.send({success: true, msg: 'User data added successfully'})

})

/* Read - GET method */
app.get('/user/list', (req, res) => {
    const users = getUserData()
    res.send(users)
})

/* Update - put method */
app.put('/user/update/:name', (req, res) => {
    //get the name from url
    const name = req.params.name

    //get the update data
    const userData = req.body

    //get the existing user data
    const existUsers = getUserData()

    //check if the name exist or not       
    const findExist = existUsers.find( user => user.name === name )
    if (!findExist) {
        return res.status(409).send({error: true, msg: 'name not exist'})
    }

    //filter the userdata
    const updateUser = existUsers.filter( user => user.name !== name )

    //push the updated data
    updateUser.push(userData)

    //finally save it
    saveUserData(updateUser)

    res.send({success: true, msg: 'User data updated successfully'})
})

/* Delete - Delete method */
app.delete('/user/delete/:name', (req, res) => {
    const name = req.params.name

    //get the existing userdata
    const existUsers = getUserData()

    //filter the userdata to remove it
    const filterUser = existUsers.filter( user => user.name !== name )

    if ( existUsers.length === filterUser.length ) {
        return res.status(409).send({error: true, msg: 'name does not exist'})
    }

    //save the filtered data
    saveUserData(filterUser)

    res.send({success: true, msg: 'User removed successfully'})
    
})

/* 
Clear Stars - Scheduled clear function which will run on a certain day of week (0 - 7) (0 or 7 is Sun) 
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL
*/

/* Default is every Monday (1) */
if (reset == true) {

    let ts = new Date();

    const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = 1;
    rule.hour = 0;
    rule.minute = 0;

    //const job = schedule.scheduleJob('0 0 * * 1', function(){
        const job = schedule.scheduleJob(rule, function(){
        //get the existing userdata
        const users = getUserData();

        // users.forEach(obj => {
        //     Object.entries(obj).forEach(([key, value]) => {
        //         console.log(`${key} ${value}`);
        //     });
        //     console.log('-------------------');
        // });

        users.forEach(function(user) {
            //console.log(user.stars);
            user.stars = 0;
            //console.log(user.stars);
        });

        //save the updated data
        saveUserData(users)
    
    console.log('Stars cleared successfully at: ' + ts);
  });
    
}

/* util functions */

//write the user data back to the json file
const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('data.json', stringifyData)
}

//get the user data from json file
const getUserData = () => {
    const jsonData = fs.readFileSync('data.json')
    return JSON.parse(jsonData)    
}

/* util functions ends */


//configure the server port
app.listen(9000, () => {
    console.log('Server runs on port 9000')
})