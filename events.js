/*STEPS TO IMPLEMENT EVENTS WITH A CUSTOM OBJECT

0.import the events module ex: var events = require('events')
1. define an object and add an event to it using Events.Emmiter.call(this)
2. add Event.EventEmitter.prototype to you obejct prototyping.
   ex: myObj.prototype.__proto__ = events.Emitter.prototype
3. The object can now emit an event ex: myObj.emit('someEvent')
4.then add listeners to your object with callbacks
*/


var events = require('events');

function Student(name, age, lesson) { 
    this.name = name;
    this.age= age;
    this.class = lesson;
    
    //add an event to the object
    events.EventEmitter.call(this);
    
    //a behavior to monitor for age changes
    this.changeAge= function(value){
        this.age += value;
        this.emit('ageChanged');
    };
    
    //a behavior to monitor for class changes
    this.lessonChange = function(newClass){
        this.lesson = newClass;
        this.emit('classChanged');
    }
    
}

//add event prototype to your object
Student.prototype.__proto__ = events.EventEmitter.prototype;

//implement callback functions to associate with listeners

function increaseAge(newAge){
    if(this.age !== newAge) {console.log("student's age has changed, and now is: " +this.age);}
}

function checkLesson(){
    console.log("student's new class is : "+ this.lesson);
}

//instanciate the object and test

var myStudent = new Student('Brahima',40,'Math');

//add listeners and callbacks to the object
myStudent.on("ageChanged",increaseAge);
myStudent.on("classChanged",checkLesson);

//modify properties to create events

myStudent.changeAge(3);
myStudent.lessonChange('Geography');

//because the event is created anytime the age is reset,
//the following code create one even though the is not increased

myStudent.changeAge(0);


