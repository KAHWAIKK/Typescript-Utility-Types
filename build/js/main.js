"use strict";
/* UTILITY TYPES */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//
const updateAssignment = (assign /* a function that accepts a parameter called assign */, propsToUpdate) => {
    return Object.assign(Object.assign({}, assign), propsToUpdate);
};
const assign1 = {
    studentID: 'compsci123',
    title: 'Final Project',
    grade: 0,
};
console.log(updateAssignment(assign1, { grade: 95 }));
// {
//     "studentID": "compsci123",
//     "title": "Final Project",
//     "grade": 95 - has updated from grade 0 to 95
// }
//alternatively
const assignGraded = updateAssignment(assign1, { grade: 5 });
console.log(assignGraded);
// {
//     "studentID": "compsci123",
//     "title": "Final Project",
//     "grade": 5 //has updated from grade 95 to 5
// }
/* REQUIRED AND READONLY UTILITY TYPES */
const recordAssignment = (assign /* this means all members of the interface assignment will be required */) => {
    //send to database,etc
    return assign;
};
const assignVerified /* this means all members of the interface assignment cannot be over-written*/ = Object.assign(Object.assign({}, assignGraded), { verified: true /* we have the option have to include verifired member or not since its an optional mmeber */ });
console.log(assignVerified);
// {
//     "studentID": "compsci123",
//     "title": "Final Project",
//     "grade": 5
//     verifired : true 
// }
//However we cant re-assign any property since it is under readonly utility type
//assignVerified.grade = 5
//TS reads error message Cannot assign to 'grade' because it is a read-only property.
//recordAssignment(assignGraded)
//TS reads error message as assign Graded requires that all members of the interface assignment be provided.
//To solve for this problem,we provide it in object as the parameter and ass the verified property
recordAssignment(Object.assign(Object.assign({}, assignGraded), { verified: true }));
// {
//     "studentID": "compsci123",
//     "title": "Final Project",
//     "grade": 5,
//     "verified": true
// }
/* RECORD UTILITY- Most popular */
const hexColorMap /* We are explicitly stating that the key will be a string and also value will be a string */ = {
    "red": "FF0000",
    "green": "00FF00",
    "blue": "0000FF",
    "yellow": "FDFD96"
};
const finalGrades /* Keys will be Students and values will be LetterGrades */ = {
    Sara: "B",
    Kelly: "U"
    //Mary : "A"  
    //TS shows error and 'Mary' does not exist in type 'Record<Students, LetterGrades>'
};
const gradeData = {
    Sara: { assign1: 85, assign2: 93 }, /* We will assign an object as the interface Grades requires key-value pairs */
    Kelly: { assign1: 50, assign2: 15 }
};
/* The pick utility is used to pick the property we want to use from our interface assignment in our new assignresult type  */
const score = {
    studentID: "33256273",
    grade: 85
};
/* The omit utility omits the properties we want to remove from the Assignment interface */
const preview = {
    studentID: "33256273",
    title: "Final Project",
    /* We will only provide members that were not omitted */
};
//we would then provide a function with the return keyword
const createNewAssign = (title, points) => {
    return { title: title, points: points };
};
//However with this type we have one challenge, if we change the function then we must also change the type
/* Now with the Return type Utility */
//1.Create the function first withough giving it a type:
const createNewAssignA = (title, points) => {
    return { title, points };
};
//mousing over newAssignA shows 
// type newAssignA = {
//     title: string;
//     points: number;
// }
/* ReturnType utility is very useful especially when working with functions you did not create eg when working with  a third party library and you have updated the library that changes everything and now the return is different*/
//Use Case of ReturnType utility
const tsAssign = createNewAssignA("Utilities", 100);
console.log(tsAssign); //  
//Mousing over the AssignParams type we notice that its a tuple>>type AssignParams = [title: string, points: number]
const assignArgs = ["Generic", 100];
const tsAssign2 = createNewAssignA(...assignArgs);
console.log(tsAssign2);
const fetchUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch('https://jsonplaceholder.typicode.com/users').then(res => {
        return res.json();
    }).catch(err => {
        if (err instanceof Error)
            console.log(err.message);
    });
    return data;
});
//now type FetchUsersReturnTypeA is now a user array type.
fetchUsers().then(users => console.log(users));
//returns an array of 10 objects
