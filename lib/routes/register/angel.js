var config = require('../../../config');
var db = require('../../../util/db');
var input = require('../../../util/input');

// POST /register/angel
module.exports = function* () {
    // Get input
    var firstName = this.request.body.firstName;
    var lastName = this.request.body.lastName;
    var email = this.request.body.email;
    var phoneNumber = this.request.body.phoneNumber;
    var medicalProfession = this.request.body.medicalProfession;
    var transportation = this.request.body.transportation;
    var shelterInformation = this.request.body.shelterInformation;
    var laborSkill = this.request.body.laborSkill;

    // Input validation
    if (!input.isPopulatedString(firstName)) {
        throw { status: 400, message: 'The First Name is missing.' };
    }
    if (!input.isPopulatedString(lastName)) {
        throw { status: 400, message: 'The Last Name is missing.' };
    }

    if (!input.isPopulatedString(phoneNumber)) {
        throw { status: 400, message: 'The Phone Number is missing.' };
    }
    if ((phoneNumber.replace(/\D+/g,'')).length<10){
        throw { status: 400, message: 'The phone number is too short.' };
    }
    if ((phoneNumber.replace(/\D+/g,'')).length>10){
        throw { status: 400, message: 'The phone number is too long.' };
    }

    // User obj
    var angel = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        medicalProfession: medicalProfession,
        transportation: transportation,
        shelterInformation: shelterInformation,
        laborSkill: laborSkill
    };

    // Insert it
    yield db.angels.insert(angel);

    // Send back success
    this.body = { success: true };
};
