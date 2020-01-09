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

console.log("===== Factory Method Example Output =====")
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

console.log("===== Singleton Example Output =====")
console.log(processManager === processManager2)

// If true, both process manager (instances) are equal; therefore, both point to
// the same process manager.


//********** Strategy Design Pattern **********//

// What's the scenario? I want to write a program that provides different
// shipping calculations for companies such as FedEx, UPS, and USPS.

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

function Shipping() {
    this.company = ""
    this.setStrategy = (company) => {
        this.company = company
    }
    this.calculate = package => {
        return this.company.calculate(package)
    }
}

const fedex = new FedEx()
const ups = new UPS()
const usps = new USPS()

// We're not using the example below. Only to define 'package' within global scope
const package = { from: "Alabama", to: "Georgia", weight: 1.56 }

const shipping = new Shipping()
shipping.setStrategy(fedex)
console.log("===== Strategy Example Output =====")
console.log("Fedex: " + shipping.calculate(package))

shipping.setStrategy(ups)
console.log("UPS: " + shipping.calculate(package))

shipping.setStrategy(usps)
console.log("USPS: " + shipping.calculate(package))

//********** Strategy Design Pattern **********//