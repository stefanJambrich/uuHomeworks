//Input data
const dtoIn = {
    count: 10,
    age: {
        min: 18,
        max: 65
    }
}

//Emplyoee generator
class Employee {
    constructor(ageMin, ageMax) {
        this.gender = randomNum(0, 2) === 1 ? "male" : "female";
        this.firstName = firstNames[randomNum(0, firstNames.length)];
        this.lastName = lastNames[randomNum(0, lastNames.length)];
        this.age = Math.floor(randomNum(ageMin, ageMax));
        this.workload = randomWorkload();
        this.birthdate = generateRandomDate(new Date(1960, 1, 1), new Date(2005, 1, 1));
    }
}

const firstNames = ["Jan", "Jiří", "Petr", "Josef", "Pavel", "Martin", "Jaroslav", "Tomáš", "Miroslav", "František", "Václav", "Michal", "Karel", "David", "Lukáš", "Jakub", "Zdeněk", "Radek", "Milan", "Miloslav", "Daniel", "Michal", "Marek", "Vladimír", "Aleš", "Jindřich", "Roman", "Vojtěch", "Stanislav", "Miroslav", "Oldřich", "Jiří", "Ivan", "Petr", "Jiří", "Jaroslav", "Pavel", "Petr", "Vladislav", "Petr"];

const lastNames = ["Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Kučera", "Veselý", "Horák", "Němec", "Marek", "Pospíšil", "Pokorný", "Hájek", "Král", "Růžička", "Beneš", "Fiala", "Sedláček", "Doležal", "Zeman", "Kolář", "Krejčí", "Němcová", "Dvořáková", "Kučerová", "Nováková", "Mareková", "Pokorná", "Pospíšilová", "Hájková", "Jelínková", "Krčmářová", "Křížová"];

const randomNum = (min, max) => {
    return Math.floor((Math.random() * max) + min);
};

const randomWorkload = () => {
    const n = randomNum(0, 3);
    switch (n) {
        case 0:
            return 10;
        case 1:
            return 20;
        case 2:
            return 30;
        case 3:
            return 40;
    }
};

const generateRandomDate = (from, to) => {
    return new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));
};

const generateEmployeeData = (count, ageMin, ageMax) => {
    let employees = [];
    for (let i = 0; i < count; i++) {
        employees.push(new Employee(ageMin, ageMax));
    }
    
    return employees;
};

//Getting employee statistics
const getMedian = (arr) => {
    const mid = Math.floor(arr.length / 2);
    const sortedArr = arr.sort((a, b) => a - b);

    return arr.length % 2 === 0 ? (sortedArr[mid - 1] + sortedArr[mid]) / 2 : sortedArr[mid];
}
    
const getEmployeeStatistics = (employees) => {
    const dtoOut = {
        count: employees.length,
        workload10: employees.filter(e => e.workload === 10).length,
        workload20: employees.filter(e => e.workload === 20).length,
        workload30: employees.filter(e => e.workload === 30).length,
        workload40: employees.filter(e => e.workload === 40).length,
        averageAge: Math.floor(employees.reduce((a, b) => a + b.age, 0) / employees.length),
        minAge: Math.min(...employees.map(e => e.age)),
        maxAge: Math.max(...employees.map(e => e.age)),
        medianAge: getMedian(employees.map(e => e.age)),
        medianWorkload: getMedian(employees.map(e => e.workload)),
        averageWomenWorkload: getMedian(employees.filter(e => e.gender === 'female').map(e => e.workload)),
        sortedByWorkload: employees.sort((a, b) => a.workload - b.workload)
    }
    return dtoOut;
}

const main = (dtoIn) => {
    let employees = generateEmployeeData(dtoIn.count, dtoIn.age.min, dtoIn.age.max);
    return getEmployeeStatistics(employees);
};

console.log(main(dtoIn));