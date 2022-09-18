module.exports = function (app) {
    const auth = require('./api/auth');
    const read = require('./api/readData');
    const verify = require('./api/checkPermission');
    const update = require('./api/updateData');


    // AUTH
    app.route('/register')
        .post(auth.register);
    app.route('/login')
        .post(auth.login);

    // READ DATA
    app.route('/userList')
        .get(verify.isAdmin, read.allUser);
    app.route('/studentList')
        .get(verify.isTeacher, read.listStudent);
    app.route('/findStudent/name/:studentName')
        .get(verify.isTeacher, read.findStdByName);
    app.route('/findStudent/email/:studentEmail')
        .get(verify.isTeacher, read.findStdByEmail);
    app.route('/findUser/name/:userName')
        .get(verify.isAdmin, read.findUserByName);
    app.route('/findUser/email/:userEmail')
        .get(verify.isAdmin, read.findUserByEmail);

    // UPDATE DATA
    app.route('/changePass')
        .put(verify.isStudent, update.updatePassword);
    app.route('/resetPass/:userEmail')
        .put(verify.isAdmin, update.resetPassword);
};