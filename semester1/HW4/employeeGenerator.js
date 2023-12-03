const maleFirstNames = ["Jan", "Jakub", "Tomáš", "Adam", "Petr", "Jiří", "Václav", "Martin", "Marek", "David", "Lukáš", "Michal", "Daniel", "Josef", "Pavel", "Ondřej", "Matěj", "Dominik", "Radek", "Karel", "Stanislav", "Zdeněk", "František", "Roman", "Milan", "Libor", "Filip", "Ladislav", "Jaroslav", "Aleš"];
const maleLastNames = ["Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Kučera", "Veselý", "Horák", "Marek", "Pokorný", "Král", "Růžička", "Beneš", "Fiala", "Ondráček", "Sedláček", "Mach", "Polák", "Kopecký"];
const femaleFirstNames = ["Anna", "Marie", "Jana", "Eva", "Hana", "Kateřina", "Lenka", "Lucie", "Michaela", "Markéta", "Tereza", "Zuzana", "Klára", "Veronika", "Petra", "Martina", "Barbora", "Simona", "Kristýna", "Nikola"];
const femaleLastNames = ["Nováková", "Svobodová", "Novotná", "Dvořáková", "Černá", "Procházková", "Kučerová", "Veselá", "Horáková", "Marková", "Pokorná", "Králová", "Růžičková", "Benešová", "Fialová", "Ondráčková", "Sedláčková", "Machová", "Poláková", "Kopecká"];

const employeeWorkloadsCount = [0, 0, 0, 0];

const generateEmployees = (ageMin, ageMax) => {
    const employeeGender = randomNum(0, 2) === 1 ? "male" : "female";
    const employeeBirthdate = generateRandomDate(new Date((new Date().getFullYear() - ageMax), 0, 1), new Date((new Date().getFullYear() - ageMin), 0, 1));
    
    const dtoOut ={
        gender: employeeGender,
        firstName: employeeGender === "male" ? maleFirstNames[randomNum(0, maleFirstNames.length)] : femaleFirstNames[randomNum(0, femaleFirstNames.length)],
        lastName: employeeGender === "male" ? maleLastNames[randomNum(0, maleLastNames.length)] : femaleLastNames[randomNum(0, femaleLastNames.length)],
        age: new Date().getFullYear() - employeeBirthdate.getFullYear(),
        workload: randomWorkload(),
        birthdate: employeeBirthdate.toISOString()
    }

    return dtoOut;
}

const randomNum = (min, max) => {
    return Math.floor((Math.random() * max) + min);
};

const randomWorkload = () => {
    const n = randomNum(0, 4);
    switch (n) {
        case 0:
            employeeWorkloadsCount[0]++;
            return 10;
        case 1:
            employeeWorkloadsCount[1]++;
            return 20;
        case 2:
            employeeWorkloadsCount[2]++;
            return 30;
        case 3:
            employeeWorkloadsCount[3]++;
            return 40;
        default:
            return "Invalid workload"
    }
};

const generateRandomDate = (from, to) => {
    return new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));
}

const getMedian = (array) => {
    const arraySorted = array.sort((a, b) => a - b);
    return arraySorted.length % 2 === 0 ? (arraySorted[arraySorted.length / 2 - 1] + arraySorted[arraySorted.length / 2]) / 2 : arraySorted[Math.floor(arraySorted.length / 2)];
}

const generateEmployeeData = ({count, age}) => {
    let employees = [];
    
    for (let i = 0; i < count; i++) {
        employees.push(generateEmployees(age.min, age.max));
    }
    
    return employees;
}

const getEmployeeStatistics = (employees) => {
    const employeeAges = employees.map(employee => parseInt(employee.age));

    const statistics = {
        total: employees.length,
        workload10: employeeWorkloadsCount[0],
        workload20: employeeWorkloadsCount[1],
        workload30: employeeWorkloadsCount[2],
        workload40: employeeWorkloadsCount[3],
        averageAge: parseFloat((employees.reduce((acc, employee) => acc + employee.age, 0) / employees.length).toFixed(1)),
        minAge: Math.min(...employeeAges),
        maxAge: Math.max(...employeeAges),
        medianAge: getMedian(employeeAges),
        medianWorkload: getMedian(employees.map(employee => employee.workload)),
        averageWomenWorkload: getMedian(employees.filter(e => e.gender === 'female').map(e => e.workload)),
        sortedByWorkload: employees.sort((a, b) => a.workload - b.workload)
    }

    return statistics;
}

const main = (dtoIn) => {
    const employees = generateEmployeeData(dtoIn);
    return getEmployeeStatistics(employees);
}

//Input data
const dtoIn = {
    count: 10,
    age: {
        min: 18,
        max: 30
    }
}

console.log(main(dtoIn));