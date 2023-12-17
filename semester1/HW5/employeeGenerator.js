const maleFirstNames = ["Jan", "Jakub", "Tomáš", "Adam", "Petr", "Jiří", "Václav", "Martin", "Marek", "David", "Lukáš", "Michal", "Daniel", "Josef", "Pavel", "Ondřej", "Matěj", "Dominik", "Radek", "Karel", "Stanislav", "Zdeněk", "František", "Roman", "Milan", "Libor", "Filip", "Ladislav", "Jaroslav", "Aleš"];
const maleLastNames = ["Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Kučera", "Veselý", "Horák", "Marek", "Pokorný", "Král", "Růžička", "Beneš", "Fiala", "Ondráček", "Sedláček", "Mach", "Polák", "Kopecký"];
const femaleFirstNames = ["Anna", "Marie", "Jana", "Eva", "Hana", "Kateřina", "Lenka", "Lucie", "Michaela", "Markéta", "Tereza", "Zuzana", "Klára", "Veronika", "Petra", "Martina", "Barbora", "Simona", "Kristýna", "Nikola"];
const femaleLastNames = ["Nováková", "Svobodová", "Novotná", "Dvořáková", "Černá", "Procházková", "Kučerová", "Veselá", "Horáková", "Marková", "Pokorná", "Králová", "Růžičková", "Benešová", "Fialová", "Ondráčková", "Sedláčková", "Machová", "Poláková", "Kopecká"];

const generateEmployees = (ageMin, ageMax) => {
    const employeeGender = randomNum(0, 2) === 1 ? "male" : "female";
    const employeeBirthdate = generateRandomDate(new Date((new Date().getFullYear() - ageMax), 0, 1), new Date((new Date().getFullYear() - ageMin), 0, 1));
    
    const dtoOut ={
        gender: employeeGender,
        firstName: employeeGender === "male" ? maleFirstNames[randomNum(0, maleFirstNames.length)] : femaleFirstNames[randomNum(0, femaleFirstNames.length)],
        lastName: employeeGender === "male" ? maleLastNames[randomNum(0, maleLastNames.length)] : femaleLastNames[randomNum(0, femaleLastNames.length)],
        age: new Date().getFullYear() - employeeBirthdate.getFullYear(),
        workload: randomWorkload(),
        birthdate: employeeBirthdate,
        count: 0
    }

    return dtoOut;
}

const randomNum = (min, max) => {
    return Math.floor((Math.random() * max) + min);
};

const randomWorkload = () => {
    const n = randomNum(0, 4);
    return (n + 1) * 10;
};

const generateRandomDate = (from, to) => {
    return new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));
}

const countOccurancesOfNames = (array) => {
    const countedValues = [];
    for (let i = 0; i < array.length; i++) {
        const name = array[i].firstName;
        if (countedValues[name]) {
            countedValues[name]++;
        } else {
            countedValues[name] = 1;
        }
    }
    return countedValues;
}

const generateNames = (employees) => {
    const names = {
        all: countOccurancesOfNames(employees),
        male: countOccurancesOfNames(employees.filter(employee => employee.gender === "male")),
        female: countOccurancesOfNames(employees.filter(employee => employee.gender === "female")),
        maleFullTime: countOccurancesOfNames(employees.filter(employee => (employee.workload === 30 || employee.workload === 20 || employee.workload === 10) && employee.gender === "male")),
        femalePartTime: countOccurancesOfNames(employees.filter(employee => employee.workload === 40 && employee.gender === "female"))
    };
    return names;
}

const mapNames = (names) => {
    return Object.keys(names).map(key => {
        return { label: key, count: names[key] };
    });
}

const generateChartData = (names) => {
    const chartData = {
        all: mapNames(names.all),
        male: mapNames(names.male),
        female: mapNames(names.female),
        maleFullTime: mapNames(names.maleFullTime),
        femalePartTime: mapNames(names.femalePartTime),
    }
    return chartData;
}

const generateEmployeeData = ({count, age}) => {
    const employees = [];
    
    for (let i = 0; i < count; i++) {
        employees.push(generateEmployees(age.min, age.max));
    }
    
    return employees;
}

const getEmployeeChartContent = (employees) => {
    const names = generateNames(employees);
    const chartData = generateChartData(names);
    const dtoOut = {
        names: names,
        chartData: JSON.stringify(chartData, 1),
    }
    return dtoOut;
}

const main = (dtoIn) => {
    const employees = generateEmployeeData(dtoIn);
    return getEmployeeChartContent(employees);
}

const dtoIn = {
    count: 20,
    age: {
        min: 18,
        max: 30
    }
}

console.log(main(dtoIn));