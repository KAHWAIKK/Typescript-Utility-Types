/* UTILITY TYPES */

//TS offers many utility types that are used for common type transformations.

//Partial utility type - they allow us to pass in an object that only has one property of assignment

interface Assignment {
    studentID : string;
    title : string;
    grade : number;
    verified? : boolean;
}


//
const  updateAssignment = (assign : Assignment /* a function that accepts a parameter called assign */, propsToUpdate : Partial<Assignment>) /* Also accept another parameter called propsToUpdate */
: Assignment => {
    return { ...assign, ...propsToUpdate}
}

const assign1 : Assignment = {
    studentID : 'compsci123',
    title : 'Final Project',
    grade : 0,
}

console.log(updateAssignment(assign1, { grade : 95} ))
// {
//     "studentID": "compsci123",
//     "title": "Final Project",
//     "grade": 95 - has updated from grade 0 to 95
// }


//alternatively
const assignGraded : Assignment = updateAssignment(assign1, { grade : 5} )

console.log(assignGraded)
// {
//     "studentID": "compsci123",
//     "title": "Final Project",
//     "grade": 5 //has updated from grade 95 to 5
// }

/* REQUIRED AND READONLY UTILITY TYPES */


const recordAssignment = (assign : Required<Assignment> /* this means all members of the interface assignment will be required */):Assignment => {
    //send to database,etc
    return assign
}

const assignVerified  : Readonly<Assignment> /* this means all members of the interface assignment cannot be over-written*/
 = {
    ...assignGraded, verified : true /* we have the option have to include verifired member or not since its an optional mmeber */
}

console.log(assignVerified)
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

recordAssignment({ ...assignGraded, verified: true })
// {
//     "studentID": "compsci123",
//     "title": "Final Project",
//     "grade": 5,
//     "verified": true
// }


/* RECORD UTILITY- Most popular */

const hexColorMap : Record<string, string>/* We are explicitly stating that the key will be a string and also value will be a string */ = {
    "red" : "FF0000",
    "green" : "00FF00",
    "blue" : "0000FF",
    "yellow" : "FDFD96"
}

//You can also create string literal types
//Example

type Students = "Sara" | "Kelly"
type LetterGrades = "A" | "B" | "C" | "D" | "U"


const finalGrades : Record<Students, LetterGrades>/* Keys will be Students and values will be LetterGrades */ = {
    Sara : "B",
    Kelly : "U"
    //Mary : "A"  
    //TS shows error and 'Mary' does not exist in type 'Record<Students, LetterGrades>'
}

/* We can also do this with an interface */

interface Grades {
    assign1 : number
    assign2 : number
}

const gradeData : Record<Students, Grades> = {
    Sara : { assign1:85 , assign2 : 93},/* We will assign an object as the interface Grades requires key-value pairs */
    Kelly : { assign1:50 , assign2 : 15}
}

/* PICK & OMIT */


type AssignResult = Pick<Assignment , "studentID" | "grade" >
/* The pick utility is used to pick the property we want to use from our interface assignment in our new assignresult type  */

const score : AssignResult = {
    studentID : "33256273",
    grade : 85
}

type AssignPreview = Omit<Assignment, "verified"| "grade">
/* The omit utility omits the properties we want to remove from the Assignment interface */

const preview : AssignPreview = {
    studentID : "33256273",
    title : "Final Project",
    /* We will only provide members that were not omitted */
}

/* EXCLUDE & EXTRACT */
//This utility types do not work with type interface ,they only work with string literals Union types

type adjustedGrade = Exclude<LetterGrades , "U">

/* type adjustedGrade will exlude U from its members and now include (type adjustedGrade = "A" | "B" | "C" | "D") */


type highGrades = Extract<LetterGrades , "A" | "B" | "C">

/* type highGrade will extract A|B|C from its members in the LetterGrades and now have (type highGrades = "A" | "B" | "C") */


/* NONNULLABLE */

type AllPossibleGrades = 'Dave' | 'John' | 'null' | null | undefined | 5256 | true

/* Mousing over AllPossibleGrades gives type AllPossibleGrades = "Dave" | "John" | "null" | null | undefined */

type NamessOnly = NonNullable<AllPossibleGrades>
/* Mousing over NamesOnly gives type NamessOnly = "Dave" | "John" | "null" */

/* The nonnullable utility types only gives string and number union litral types. It excludes undefined and boolean types */

/* RETURN TYPE */

//Recap of the typical manner to create a type

type newAssign = { title: string , points: number }

//we would then provide a function with the return keyword

const createNewAssign = (title: string, points: number) : newAssign => {
    return { title: title, points: points}
}

//However with this type we have one challenge, if we change the function then we must also change the type


/* Now with the Return type Utility */

//1.Create the function first withough giving it a type:

const createNewAssignA = (title: string, points: number)  => {
    return { title, points}
}

//After we create the function we then  create the type and set it equal to ReturnType

type NewAssignA = ReturnType<typeof createNewAssignA>

//mousing over newAssignA shows 
// type newAssignA = {
//     title: string;
//     points: number;
// }

/* ReturnType utility is very useful especially when working with functions you did not create eg when working with  a third party library and you have updated the library that changes everything and now the return is different*/

//Use Case of ReturnType utility

const tsAssign : NewAssignA = createNewAssignA("Utilities", 100)
console.log(tsAssign) //  
// {
//     "title": "Utilities",
//     "points": 100
// }


/* It is important to note that ReturnType Utility are derived from functions */

/* Parameter type Utility */ 
//They follow the same theme where they are derived from functions

type AssignParams = Parameters<typeof createNewAssign>

//Mousing over the AssignParams type we notice that its a tuple>>type AssignParams = [title: string, points: number]

const assignArgs: AssignParams = [ "Generic", 100]

const tsAssign2 : NewAssignA = createNewAssignA(...assignArgs)

console.log(tsAssign2)
// {
//     "title": "Generic",
//     "points": 100
// }

/* AWAITED UTILITY TYPE */ //This helps us with the ReturnType of a Promise

//Example of a fetch function

interface User {
    id: number,
    name: string,
    username: string,
    email: string,
}

const fetchUsers = async () : Promise<User[] /* Notice the return type is a Promise that will return an Array of users */> => {

    const data = await fetch (
        'https://jsonplaceholder.typicode.com/users'
    ).then( res => {
        return res.json()
    }).catch( err => {
        if (err instanceof Error) console.log(err.message);
    })
    return data
}

//To get this return type if we were using the awaited utility type

type FetchUsersReturnType = ReturnType<typeof fetchUsers>
//Using the ReturnType here is not what we would want as it says the (type FetchUsersReturnType = Promise<User[]>) FetchUsersReturnType is a Promise. Instead we would want to do this:

type FetchUsersReturnTypeA = Awaited<ReturnType<typeof fetchUsers>>
//now type FetchUsersReturnTypeA is now a user array type.

fetchUsers().then( users => console.log(users));
//returns an array of 10 objects
