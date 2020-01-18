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


//********** Iterator Design Pattern **********//

// What's the scenario? I want to write a program that allows me to "loop"
// over a collection of objects. I want to traverse and manipulate the collection.
// We will use an array as our collection that consist of different data types.


const items = [1, "LeShawn", false, 1.24]

// Iterator allows you to start from the first or last index of an array
function Iterator(items) {
    this.items = items
    this.index = 0
}

Iterator.prototype = {
    // method used to check if there is another index (true/false)
    hasNext: function() {
        return this.index < this.items.length
    },
    // method used to check/point to the next index
    next: function() {
        return this.items[this.index++]
    }
}

const iter = new Iterator(items)
console.log("===== Iterator Example Output =====")

// While loop used to console.log all items/elements
// While loop is more efficient and scalable than individually
// console.log all elements as you see below.
while(iter.hasNext())
console.log(iter.next())

// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.hasNext());


//********** Observer Design Pattern **********//

// What's the scenario? I want to write a program where I define a one
// to many dependency relationship between one object "the subject" to
// many other objects "the observers". The observers will watch for a
// signal from the subject for them to be executed/called.

function Subject() {
    this.observers = [] // array of 'observer' functions
}

Subject.prototype = {
    subscribe: function(fn) {
        this.observers.push(fn)
    },
    unsubscribe: function(fnToRemove) {
        this.observers = this.observers.filter( fn => {
            if(fn != fnToRemove)
            return fn
        })
    },
    fire: function() {
        this.observers.forEach( fn => {
            fn.call()
        })
    }
}

const subject = new Subject()

function Observer1() {
    console.log("Observer 1 Firing!")
}

function Observer2() {
    console.log("Observer 2 Firing!")
}

subject.subscribe(Observer1)
subject.subscribe(Observer2)

// will unsubscribe which ever function you pass thru
subject.unsubscribe(Observer1)

// using the .fire() to call all observer functions to the console
console.log("===== Observer Example Output =====")
subject.fire()


//********** Builder Design Pattern **********//

// What's the scenario? I want to write a program that creates a new user
// by name and other methods that will return the users age, phone, and 
// address (zip, street).

// class Address {
//     constructor(zip, street) {
//         this.zip = zip
//         this.street = street
//     }
// }

// class User {
//     constructor(name, age, phone, address) {
//         this.name = name
//         this.age = age
//         this.phone = phone
//         this.address = address
//     }
// }

// class UserBuilder {
//     constructor(name) {
//         this.user = new User(name)
//     }

//     setAge(age) {
//         this.user.age = age
//         return this
//     }

//     setPhone(phone) {
//         this.user.phone = phone
//         return this
//     }

//     setAddress(address) {
//         this.user.address = address
//         return this
//     }

//     build() {
//         return this.user
//     }
// }

// let user = new UserBuilder("LeShawn").setAddress().setAge(10).build()
// console.log(user)

// OR - 

class Address {
    constructor(zip, street) {
        this.zip = zip
        this.street = street
    }
}

class User {
    // You can create 'optional' parameters by passing them through
    // as JS objects as you see below {age, phone, address}
    constructor(name, {age, phone, address} = {}) {
        this.name = name
        this.age = age
        this.phone = phone
        this.address = address
    }
}

console.log("===== Builder Example Output =====")
let user = new User("LeShawn", {age:10, address: new Address(27610, "Raleigh")})
console.log(user)


//Refer to "main.ts" for State Design Pattern example
