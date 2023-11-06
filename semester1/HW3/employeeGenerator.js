const firstNames = ["Jan", "Jiří", "Petr", "Josef", "Pavel", "Martin", "Jaroslav", "Tomáš", "Miroslav", "František", "Václav", "Michal", "Karel", "David", "Lukáš", "Jakub", "Zdeněk", "Radek", "Milan", "Miloslav", "Daniel", "Michal", "Marek", "Vladimír", "Aleš", "Jindřich", "Roman", "Vojtěch", "Stanislav", "Miroslav", "Oldřich", "Jiří", "Ivan", "Petr", "Jiří", "Jaroslav", "Pavel", "Petr", "Vladislav", "Petr"];

const lastNames = ["Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Kučera", "Veselý", "Horák", "Němec", "Marek", "Pospíšil", "Pokorný", "Hájek", "Král", "Růžička", "Beneš", "Fiala", "Sedláček", "Doležal", "Zeman", "Kolář", "Krejčí", "Němcová", "Dvořáková", "Kučerová", "Nováková", "Mareková", "Pokorná", "Pospíšilová", "Hájková", "Jelínková", "Krčmářová", "Křížová"];

const generateEmployees = (ageMin, ageMax) => {
    const dtoOut ={
        gender: randomNum(0, 2) === 1 ? "male" : "female",
        firstName: firstNames[randomNum(0, firstNames.length)],
        lastName: lastNames[randomNum(0, lastNames.length)],
        age: Math.floor(randomNum(ageMin, ageMax)),
        workload: randomWorkload(),
        birthdate: generateRandomDate(new Date(1960, 1, 1), new Date(2005, 1, 1))
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
        max: 65
    }
}

console.log(main(dtoIn.count, dtoIn.age.min, dtoIn.age.max));