const Subject = require('../model/Subject');
const User = require('../model/User');

module.exports = {
    deleteSubject: async (req, res) => {
        const name = req.param('subjectName');
        const subjectExist = await Subject.findOne({ name: name });
        if (!subjectExist) return res.status(400).send("No Found Subject");

        try {
            await Subject.findOneAndDelete({ name: name });
            res.send("Delete success");
        }
        catch (errors) {
            res.status(400).send(errors.message);
        }
    },
    deleteUser: async (req, res) => {
        const userId = req.param('userId');
        const user = await User.findOne({ _id: userId });
        if (!user) return res.status(400).send("No Found User");

        try {
            await User.findOneAndDelete({ _id: userId });
            res.send("Delete success");

        }
        catch (errors) {
            res.status(400).send(errors.message);
        }
    }
}
