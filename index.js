const inquirer = require('inquirer');
const inquireer = require('inquirer');
const mysql = require('mysql2');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'PASSWORD',
        database: 'ems_db',
        multipleStatements: true,

    },
    console.log("connected to the ems_db")
);


db.connect(function(err){
    if(err) throw err;

    initPrompt();
});

function initPrompt(){

    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            "add department",
            "add role",
            "Add employee",
            "view departments",
            "View roles",
            "View employees",
            "View total budget utilization by department",
            "View employees with the same manger",
            "Update an employees role",
            "update an employees manager",
            "Delete deparment",
            "dlelete role",
            "delete employee",
            "exit"
        ],
    }).then(function(ans){
        switch(answers.action){
            case "add department":
                addDepartment();
                break;

            case "add role":
                addRole();
                break;

            case "Add employee":
                addEmployee();
                break;
            
            case "view departments":
                viewDepartments();
                break;

            case "View roles":
                viewRoles();
                break;

            case "View employees":
                viewEmployees();
                break;
            
            case "View total budget utilization by department":
                viewBudget();
                break;
            
            case "View employees with the same manger":
                viewEmployees();
                break;
            
            case "Update an employees role":
                viewEmployeesRole();
                break;
                
            case "update an employees manager":
                viewEmployeesManager();
                break;
            
            case "Delete deparment":
                deleteDepartment();
                break;
            
            case "dlelete role":
                deleteRole();
                break;
            
            case "delete employee":
                deleteEmployee();
                 break;

            case "exit":
                db.end();
                console.log("application ended");
                render();
                break;
        }
    })
}

// function addDepartment(){
//     inquireer.prompt({
//         name: 'newDepartment',
//         type: 'input',
//         message: 'What is the department name?'
//     }).then(answers){
//         db.query(
//             ``
//         )
//     }
// }