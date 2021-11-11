// unit.test.js

const functions = require('../code-to-unit-test/unit-test-me.js');

// TODO - Part 2

// isPhoneNumber true tests
test('Phone Number True Test 1', () => {
    expect(functions.isPhoneNumber('123-456-7890')).toBe(true);
});

test('Phone Number True Test 2', () => {
    expect(functions.isPhoneNumber('098-765-4321')).toBe(true);
});

// isPhoneNumber false tests
test('Phone Number False Test 1', () => {
    expect(functions.isPhoneNumber('012')).toBe(false);
});

test('Phone Number False Test 2', () => {
    expect(functions.isPhoneNumber('abc')).toBe(false);
});

// isEmail true tests
test('Email True Test 1', () => {
    expect(functions.isEmail('jkwok@ucsd.edu')).toBe(true);
});

test('Email True Test 2', () => {
    expect(functions.isEmail('tpowell@ucsd.edu')).toBe(true);
});

// isEmail false tests
test('Email False Test 1', () => {
    expect(functions.isEmail('example&gmail.com')).toBe(false);
});

test('Email False Test 2', () => {
    expect(functions.isEmail('789')).toBe(false);
});

// isStrongPassword true tests
test('Password Strong Test 1', () => {
    expect(functions.isStrongPassword('FUR2yQ34bdsj')).toBe(true);
});

test('Password Strong Test 2', () => {
    expect(functions.isStrongPassword('hnc9vVSa')).toBe(true);
});

// isStrongPassword false tests
test('Password Weak Test 1', () => {
    expect(functions.isStrongPassword('FUR')).toBe(false);
});

test('Password Weak Test 2', () => {
    expect(functions.isStrongPassword('10000000000000000')).toBe(false);
});

// isDate true tests
test('Date True Test 1', () => {
    expect(functions.isDate('11/10/2021')).toBe(true);
});

test('Date True Test 2', () => {
    expect(functions.isDate('1/1/2021')).toBe(true);
});

// isDate false tests
test('Date False Test 1', () => {
    expect(functions.isDate('2021')).toBe(false);
});

test('Date False Test 2', () => {
    expect(functions.isDate('1/1')).toBe(false);
});

// isHexColor true tests
test('Hex True Test 1', () => {
    expect(functions.isHexColor('#ead6d2')).toBe(true);
});

test('Hex True Test 2', () => {
    expect(functions.isHexColor('#ead')).toBe(true);
});

// isHexColor false tests
test('Hex False Test 2', () => {
    expect(functions.isHexColor('#e')).toBe(false);
});

test('Hex False Test 2', () => {
    expect(functions.isHexColor('#ead6d222')).toBe(false);
});