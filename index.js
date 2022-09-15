import inquirer from 'inquirer';
// import consoleTables from 'console.tables'
import mysql from 'mysql2'


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Zx32AmPaFJ15##2',
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
            "Update an employees role",
            "exit"
        ],
    }).then(function(answer){
        switch(answer.action){
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
            
            case "Update an employees role":
                updateEmployeesRole();
                break;

            case "exit":
                db.end();
                console.log("application ended");
                render();
                break;
        }
    });
}

function addDepartment(){
    inquirer.prompt({
        name: 'newDepartment',
        type: 'input',
        message: 'What is the department name?'
    }).then(function(answers){
        db.query(
            `ALTER TABLE department AUTO_INCREMENT = 1; INSERT INTO department SET ?`,
            {
                name: answers.newDepartment
            }
        );
        const sql = 'SELECT * FROM department';
        db.query(sql, function(err,res){
            if(err) throw err;
            console.log(answers.newDepartment + 'has been added to the system!')
            console.table('All Depatments', res);
            initPrompt();
        })
    })
};

 function addRole(){
    db.query(
        `SELECT DISTINCT * FROM department`, (err, result) => {
            if(err) throw err;

            inquirer.prompt([
                {
                    name: "role",
                    type: "input",
                    message: "What is the title of the role?",

                },
                {
                    name: "salary",
                    type: "input",
                    message: "What is the salary?",
                    validate: input =>{
                        if(isNaN(input)){

                            console.log("must be a number");
                            return false;
                        } else{
                            return true;
                        }
                    }
                },
                {
                    name: "department",
                    type: 'list',
                    message: "What department does the role belong to?",
                    choices: () => result.map((result) => result.name),
                }])
                .then(function(answers){
                const departmentId = result.filter((result) => result.name === answers.department)[0].id;

                db.query(
                        `ALTER TABLE role AUTO_INCREMENT = 1; INSERT INTO role SET ?`,
                        {
                            title: answers.role,
                            salary: answers.salary,
                            department_id: departmentId
                        },

                        function(err){
                            if (err) throw err;

                            console.log(answers.role + "has been add to " + answers.department)

                            initPrompt()
                        }
                )
            })
        })
 };

    function addEmployee(){
   db.query(
    `SELECT DISTINCT title,id FROM role`,(err,role_result) => {
        if(err) throw err;
        db.query(
            `SELECT DISTINCT CONCAT(e.first_name, " ",e.last_name) AS manager_name,e.id
            FROM employee
            LEFT JOIN employee e 
            ON employee.manager_id = e.id
            WHERE employee.manager_id IS NOT NULL
        `, (err,manager_result)=>{
            if(err) throw err;
            inquirer.prompt([
                {
                    name: "first_name",
                    type:"input",
                    message: "What is the employee's first name"
                },
                {
                    name: "last_name",
                    type: "input",
                    message: "what is their last name?"
                },
                {
                   name: "role",
                   type: "list",
                   message:"what is their role?" ,
                   choices: () => role_result((role_result) => role_result.title)
                },
                {
                    name: "manager",
                    type:"list",
                    message: "who is the employees manager?",
                    choices: () => manager_result.map((manager_result)=> manager_result.manager_name)
                }]).then(function (answers){
                    const managerId = manager_result.filter((manager_result)=> manager_result.manager_ === answers.manager)[0].id;
                    const roleId = role_result.filter((role_result) => role_result.title === answer.role)[0].id;
                    db.query(
                        `ALTER TABLE employee AUTO_INCREMENT = 1; INSERT INTO employee SET ?`,
                        {
                            first_name: answers.first_name,
                            last_name: answers.last_name,
                            role_id: roleId,
                            manager_id: managerId
                        },
                        function(err){
                            if(err) throw err;
                            console.log(answers.first_name + '' + answers.last_name + "has been added");
                            initPrompt()
                        }
                    )
                })
        }
        )
    }
   )
 };

        function viewDepartments(){
            const sql = `SELECT * FROM department`;
            db.query (sql, (err, result)=>{
                if (err) throw err;
                console.table(result);
                initPrompt();
            })
        };

       function viewRoles(){
        const sql = `SELECT role.id, title, department.name  AS department, salary FROM role LEFT JOIN department ON role.department_id = department.id ORDER BY role.id;` ;
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            initPrompt();
        })
       };

       function viewEmployees(){
        const sql = `SELECT employee.id, employee.first_name, employee.last_name,title, name AS department, salary, CONCAT(e.first_name," ", e.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee e ON employee.manager_id = e.id ORDER BY employee.id;`;
        db.query(sql, (err, result) => {
            if(err) throw err;
            console.table(result);
            initPrompt();
        })
       };

       function updateEmployeesRole(){
            db.query(`SELECT * FROM employee`, (err, employee_result) => {
                if(err) throw err;
                db.query(`SELECT * FROM role`,(err, role_result)=> {
                    if(err) throw err;
                    inquirer.prompt([
                        {
                            name: "employee",
                            type: "list",
                            message:"choose the employee that you would like to update." ,
                            choices: () => employee_result.map((employee_result) => employee_result.first_name+ " " + employee_result.last_name) 
                         },
                         {
                            name: "role",
                            type: "list",
                            message:"choose the role that you would like to assugn to this employee." ,
                            choices: () => role_result.map((role_result) => role_result.title), 
                         },
                    ]).then((answers) => {
                        const roleId = role_result.filter((role_result) = role_result.title === answers.role)[0].id;
                        const employeeId = employee_result.filter((employee_result)=> employee_result.first_name + " " + employee_result.last_name === answers.employee)[0].id;
                        db.query(
                            `UPDATE employee SET ? WHERE ?`,
                            [{
                                role_id: roleId
                            },
                        {
                            id:employeeId
                        }],
                        function(err){
                            if(err) throw err;
                            console.log(answers.employee + "'s role has been updated" )
                        }
                        )
                    })
                })
            })
       }


