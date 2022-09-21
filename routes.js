module.exports = function (app) {
    const auth = require('./api/auth');
    const read = require('./api/readData');
    const create = require('./api/createData');
    const update = require('./api/updateData');
    const remove = require('./api/deleteData');
    const verify = require('./api/checkPermission');
    const upload = require('./uploadFile');



    // AUTH
    app.route('/register')
        .post(auth.register);
    app.route('/login')
        .post(auth.login);

    // READ DATA
    app.route('/users')
        .get(verify.isAdmin, read.getUsers);
    app.route('/students')
        .get(verify.isTeacher, read.getStudents);
    app.route('/subjects')
        .get(verify.isStudent, read.getSubjects);
    app.route('/classes')
        .get(verify.isStudent, read.getClasses);
    app.route('/findStudent/:studentInfo') ///info can be name or email
        .get(verify.isTeacher, read.findStudent);
    app.route('/findUser/:userInfo') ///info can be name or email
        .get(verify.isAdmin, read.findUser);
    app.route('/studentInClass/:className')
        .get(verify.isTeacher, read.studentInClass);
    app.route('/student/registeredClass')
        .get(verify.isStudent, read.studentClass);
    app.route('/teacher/registeredClass')
        .get(verify.isTeacher, read.teacherClass);

    // UPDATE DATA
    app.route('/changePass')
        .put(verify.isStudent, update.updatePassword);
    app.route('/resetPass/:userEmail')
        .put(verify.isAdmin, update.resetPassword);
    app.route('/uploadAvatar')
        .put(verify.isStudent, upload.uploadImg, update.uploadAvatar);
    app.route('/updateClass/:className')
        .put(verify.isAdmin, update.updateClass);

    // CREATE DATA
    app.route('/createSubject')
        .post(verify.isAdmin, create.createSubject);
    app.route('/createClass')
        .post(verify.isAdmin, create.createClass);
    app.route('/registerClass')
        .post(verify.isStudent, create.registerClass);
    // DELETE DATA
    app.route('/deleteSubject/:subjectName')
        .delete(verify.isAdmin, remove.deleteSubject);
    app.route('/deleteUser/:userId')
        .delete(verify.isAdmin, remove.deleteUser);
};