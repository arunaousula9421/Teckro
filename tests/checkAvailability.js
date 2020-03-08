const supertest = require('supertest');
const expect = require('chai').expect;
const mocha = require('mocha');
const date = require('../services/Date.js').getDate();
const baseUrl = supertest('http://localhost:9090');
const checkAvailability = '/checkAvailability/'

let response;
let responseBody;

const call_checkAvailability_api = async (currentDate) => {
    return baseUrl.get(checkAvailability + currentDate);
}

/**
 * As part of this,
 * I am checking if I receive valid response
 * when valid requested date is sent
 */

describe('Positive: check availability of rooms with valid date', () => {
    before(async () => {
        response = await call_checkAvailability_api(date);
        responseBody = response.body;
    });

    it('status code is 200', () => {
        expect(response.status).to.equal(200);
    });

    it('verify response date matches the given date', () => {
        expect(responseBody.date).to.equal(date);
    });

    it('verify number of rooms', () => {
        expect(responseBody.rooms_available).to.exist;
    });

    it('verify room price', () => {
        expect(responseBody.price).to.exist;
    }); 
});

/**
 * As part of this negative test,
 * I have sent invalid date format which should return invalid response
 * but that didn't happen
 * 
 * Bugs Found:
 * 1. When invalid date format is sent, response date is invalid
 * 2. When invalid date is sent it should return 400 status code instead of 200
 * 3. Valid error message should be displayed invalid reuest is made
 * 
 * I have made the test fail as they are the bugs found
 * 
 */

describe('Negative: check availability of rooms with invalid date format', () => {
    let invalidDate = '20-03-2020';
    before(async () => {
        response = await call_checkAvailability_api(invalidDate);
        responseBody = response.body;
    });

    it('status code is 400', () => {
        expect(response.status).to.equal(400);
    });

    /**
     * Below test are just for coverage. But when invalid data is sent
     * these response shouldn't come back and tests are invalid
     */

    it('verify response date does not match the given date', () => {
        expect(responseBody.date).not.to.equal(invalidDate);
    });

    it('verify number of rooms', () => {
        expect(responseBody.rooms_available).not.to.equal(10);
    });

    it('verify room price', () => {
        expect(responseBody.price).not.to.equal(140);
    }); 
});

/**
 * As part of this negative test,
 * I have sent past date which should return invalid response
 * but that didn't happen
 * 
 * Bugs Found:
 * 1. When past date is sent, valid error should be displayed in the response
 * 2. When past date is sent, it should return 400 status code instead of 200
 * 
 * I have made the test fail as they are the bugs found
 *
 */

describe('Negative: check availability of rooms with past date', () => {
    let pastDate = '2019-03-20';
    before(async () => {
        response = await call_checkAvailability_api(pastDate);
        responseBody = response.body;
    });

    it('status code be 400', () => {
        expect(response.status).to.equal(400);
    });
});