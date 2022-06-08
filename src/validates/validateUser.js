export function validateUserInfo(user) {
    let error = '';
    const { firstName, lastName, age, coordinate } = user;
    const fullName = firstName + ' ' + lastName;
    const ageNum = parseFloat(age);
    if (!firstName || !lastName || !age || !coordinate) {
        return (error = 'Import full all all fields');
    }

    if (!new RegExp('^[A-Za-z\\s]+$').test(fullName)) {
        return (error =
            'First name, last name must be a string that does not contain numeric characters');
    }

    if (
        ageNum > 100 ||
        ageNum < 1 ||
        !new RegExp('^[0-9]*[1-9]+$|^[1-9]+[0-9]*$').test(ageNum)
    ) {
        return (error = 'Age must be a natural number from 1 to 100');
    }

    if (!new RegExp('^[0-9]{3}:[0-9]{3}$').test(coordinate)) {
        return (error =
            'in xxx format: yyy. For each x, and y are the numbers 0 <= x, y <= 9');
    }
}
