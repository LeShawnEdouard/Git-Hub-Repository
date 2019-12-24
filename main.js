//********** Factory Method Design Pattern **********//

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
// If true, both process managers are equal. Therefore, they are both
// pointed to the same process manager.