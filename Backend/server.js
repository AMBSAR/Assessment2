const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
//const userDataList = require('./JSON_Files/AllUserList.json');
const { userInfo } = require('os');
//var userDataList = null;

const app = express();
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());//for fixing CORS error

app.use(express.json());

const userJsonFilePath = "./JSON_Files/AllUserList.json";
const contractListJsonFilePath = "./JSON_Files/ContractList.json";
const ispoColumnsJsonFilePath = "./JSON_Files/ISPO_ColumnList.json";
const ispoTabularDataJsonFilePath = "./JSON_Files/ISPO_TabularData.json";
const ispoFWSummaryDataJsonFilePath = "./JSON_Files/ISPOFiscalWeekData.json";
const ispoSummaryDataJsonFilePath = "./JSON_Files/ISPOSummaryData.json";

const userDataList = JSON.parse(fs.readFileSync(userJsonFilePath, 'utf-8'));

function readUserDataList() {
    fs.readFile(userJsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data:', err);
        }

        try {
            userDataList = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing USER LIST JSON:', parseErr);
        }
    });
}

app.get('/login', (req, res) => {
    console.log("login request came");
    const { user, pwd } = req.query;
    //const { user, pwd } = req.body;

    // Log the search parameters
    console.log(`Search user: ${user}, pwd: ${pwd}`);
    //     fs.readFile(userJsonFilePath, 'utf8', (err, data) => {
    //     if (err) {
    //       console.error('Error reading file:', err);
    //       return res.status(500).json({ error: 'Failed to read User Data' });
    //     }

    //     try {
    //       const jsonData = JSON.parse(data);
    //       res.json(jsonData);
    //     } catch (parseErr) {
    //       console.error('Error parsing JSON:', parseErr);
    //       res.status(500).json({ error: 'Invalid JSON format' });
    //     }
    //   });
    // userData = null;
    // responseMsg = "Authentication Failed";
    // reqStatus = 500;
    // if (userDataList == null) {
    //     readUserDataList();
    // }
    // msg = "Incorrect username or password";
    // try {
    //     if (pwd == user + "online") {
    //         if (userDataList != null | undefined && userDataList.users != null | undefined && userDataList.users.length > 0) {
    //             userIndex = userDataList.users.findIndex(x => x.ssoid == user);
    //             console.log("user index = " + userIndex);
    //             if (userIndex != -1) {
    //                 userData = userDataList.users[userIndex];
    //                 reqStatus = 100;
    //                 responseMsg = "Authentication Success";
    //                 userData = JSON.parse(JSON.stringify(userData));
    //                 console.log(JSON.stringify(userData));
    //             }
    //         }
    //     }

    //     data = JSON.stringify(userData);
    //     console.log("sending data --- " + data);
    //     //res.status(reqStatus).end(JSON.stringify(userData));
    //     //res.status(reqStatus).json({ "id": "jhijhk", "ssoid": "samujub"});
    //     res.status(reqStatus).json({ data });
    //     //res.status(reqStatus).send({userData});
    //     // console.log("Response" + JSON.stringify(res.json));
    // } catch (parseErr) {
    //     console.error('Error parsing JSON:', parseErr);
    //     res.status(500).json({ error: 'Failed' });
    // }
    if (pwd == user + "online") {
        if (user == "samujub") {
            res.json({
                id: "5b8724d1-7f1e-3b4d-66cf-96a61c65a0f8",
                ssoid: "samujub",
                firstName: "Juby",
                lastName: "Samuel",
                emailId: "Juby.Samuel@bakerhughes.com",
                role: "Executor",
                icon: "https://th.bing.com/th/id/OIP.ZG4mPcYIdId4JwVvksfhvwHaJ3?r=0&pid=ImgDet&w=184&h=245&c=7&dpr=1.3&cb=idpwebpc2",
                isActive: true,
                accessprivilegerole: "Admin",
                globalId: "CHQ682RZ",
                empId: "JUBYSA1306",
                loginId: "samujub"
            });
        }
        // else if (user == "salibaj") {
        //     res.json({
        //         id: "b59fcadb-79d8-32e3-ae17-b9dfd3ce2329",
        //         ssoid: "salibaj",
        //         firstName: "Bajila",
        //         lastName: "Salim",
        //         emailId: "Bajila.Salim@bakerhughes.com",
        //         role: "Project Engineer",
        //         icon: "https://unsplash.com/photos/shallow-focus-photography-of-woman-outdoor-during-day-rDEOVtE7vOs",
        //         isActive: true,
        //         accessprivilegerole: "Project Engineer",
        //         globalId: "CZL958JV",
        //         empId: "BAJISA0515",
        //         loginId: "salibaj"
        //     });
        // }
        else {
            res.status(500).json({ error: 'Authentication Failed' });
        }

    // }
    // else {
    //         res.status(500).json({ error: 'Incorrect credentials!' });
    //     }
    }
    else {
            console.log(`invalid user`);
            res.status(500).json({ error: 'Incorrect credentials!' });
        }
});

app.get('/allcontracts', (req, res) => {
    console.log("allcontracts request came");
    fs.readFile(contractListJsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data:', err);
            return res.status(500).json({ error: 'Failed to read Data' });
        }

        try {
            const jsonData = JSON.parse(data);
            console.log(jsonData);
            res.json(jsonData);
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            res.status(500).json({ error: 'Invalid JSON format' });
        }
    });
});

app.get('/lastUploadDate', (req, res) => {
    res.send('04-Feb-2025');
});

app.get('/isposummary', (req, res) => {
    console.log("isposummary request came");
    fs.readFile(ispoSummaryDataJsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data:', err);
            return res.status(500).json({ error: 'Failed to read Data' });
        }

        try {
            const jsonData = JSON.parse(data);
            console.log(jsonData);
            res.json(jsonData);
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            res.status(500).json({ error: 'Invalid JSON format' });
        }
    });
});

app.get('/ispoFwSummary', (req, res) => {
    console.log("ispoFwSummary request came");
    fs.readFile(ispoFWSummaryDataJsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data:', err);
            return res.status(500).json({ error: 'Failed to read Data' });
        }

        try {
            const jsonData = JSON.parse(data);
            console.log(jsonData);
            res.json(jsonData);
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            res.status(500).json({ error: 'Invalid JSON format' });
        }
    });
});

app.get('/ispoTabularData', (req, res) => {
    console.log("ispoTabularData request came");
    fs.readFile(ispoTabularDataJsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data:', err);
            return res.status(500).json({ error: 'Failed to read Data' });
        }

        try {
            const jsonData = JSON.parse(data);
            console.log(jsonData);
            res.json(jsonData);
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            res.status(500).json({ error: 'Invalid JSON format' });
        }
    });
});

// Set up the server to listen on port 3000
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});