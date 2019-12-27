//********** Factory Method Design Pattern **********//

// What's the scenario? I own a software business and I have Developers and Testers
// as my employees. I want to create a db (database) that will contain my employees.
// I need an efficient process to create employees and enter them into my db (array).

function Developer(name) {
    this.name = name
    this.type = "Developer"
}

function Tester(name) {
    this.name = name
    this.type = "Tester"
}

function EmployeeFactory() {
    this.create = (name, type) => {
       switch(type) {
            case 1:
               return new Developer(name)
               break;
            case 2:
                return new Tester(name)
                break;
       }
    }
}

function say() {
    console.log("Hi, I am " + this.name + " and I am a " + this.type)
}

const employeeFactory = new EmployeeFactory()
const employees = [];

employees.push(employeeFactory.create("Patrick", 2))
employees.push(employeeFactory.create("LeShawn", 1))
employees.push(employeeFactory.create("Alfred", 2))

employees.forEach( emp => {
    say.call(emp)
})


//********** Singleton Design Pattern **********//

// What's the scenario? I want to write a program that manages processes.
// I want to create a 'process' and a 'process manager' so that the process manager
// can limit the number of instances to one (1) for a process.

function Process(state) {
    this.state = state
}

const Singleton = (function() {
    function ProcessManager() {
        this.numProcess = 0
    }

    let pManager

    function createProcessManager() {
        pManager = new ProcessManager()
        return pManager
    }

    return {
        getProcessManager: () => {
            if(!pManager)
                pManager = createProcessManager()
            return pManager
        }
    }
})()

const processManager = Singleton.getProcessManager();
const processManager2 = Singleton.getProcessManager();

console.log(processManager === processManager2)
// If true, both process manager (instances) are equal; therefore, both point to
// the same process manager.


//********** Strategy Design Pattern **********//

// What's the scenario? 

function FedEx() {
    this.calculate = package => {
        // fedex calculations...
        return 2.45
    }
}

function UPS() {
    this.calculate = package => {
        // UPS calculations...
        return 1.56
    }
}

function USPS() {
    this.calculate = package => {
        // USPS calculations...
        return 4.5
    }
}

