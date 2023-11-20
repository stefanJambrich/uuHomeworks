const maleFirstNames = ["Jan", "Jakub", "Tomáš", "Adam", "Petr", "Jiří", "Václav", "Martin", "Marek", "David", "Lukáš", "Michal", "Daniel", "Josef", "Pavel", "Ondřej", "Matěj", "Dominik", "Radek", "Karel", "Stanislav", "Zdeněk", "František", "Roman", "Milan", "Libor", "Filip", "Ladislav", "Jaroslav", "Aleš"];
const maleLastNames = ["Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Kučera", "Veselý", "Horák", "Marek", "Pokorný", "Král", "Růžička", "Beneš", "Fiala", "Ondráček", "Sedláček", "Mach", "Polák", "Kopecký"];
const femaleFirstNames = ["Anna", "Marie", "Jana", "Eva", "Hana", "Kateřina", "Lenka", "Lucie", "Michaela", "Markéta", "Tereza", "Zuzana", "Klára", "Veronika", "Petra", "Martina", "Barbora", "Simona", "Kristýna", "Nikola"];
const femaleLastNames = ["Nováková", "Svobodová", "Novotná", "Dvořáková", "Černá", "Procházková", "Kučerová", "Veselá", "Horáková", "Marková", "Pokorná", "Králová", "Růžičková", "Benešová", "Fialová", "Ondráčková", "Sedláčková", "Machová", "Poláková", "Kopecká"];


const generateEmployees = (ageMin, ageMax) => {
    console.log(new Date().getFullYear() - ageMin)
    const employeeGender = randomNum(0, 2) === 1 ? "male" : "female";
    const employeeBirthdate = generateRandomDate(new Date((new Date().getFullYear() - ageMax), 0, 1), new Date((new Date().getFullYear() - ageMin), 0, 1));
    
    const dtoOut ={
        gender: employeeGender,
        firstName: employeeGender === "male" ? maleFirstNames[randomNum(0, maleFirstNames.length)] : femaleFirstNames[randomNum(0, femaleFirstNames.length)],
        lastName: employeeGender === "male" ? maleLastNames[randomNum(0, maleLastNames.length)] : femaleLastNames[randomNum(0, femaleLastNames.length)],
        age: new Date().getFullYear() - employeeBirthdate.getFullYear(),
        workload: randomWorkload(),
        birthdate: employeeBirthdate
    }

    return dtoOut;
}

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
        default:
            return "Invalid workload"
    }
};

const generateRandomDate = (from, to) => {
    return new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));
}

const main = (count, ageMin, ageMax) => {
    let employees = [];
    
    for (let i = 0; i < count; i++) {
        employees.push(generateEmployees(ageMin, ageMax));
    }
    
    return employees;
}

const dtoIn = {
    count: 10,
    age: {
        min: 18,
        max: 30
    }
}

console.log(main(dtoIn.count, dtoIn.age.min, dtoIn.age.max));