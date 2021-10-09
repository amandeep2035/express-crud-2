const Student = require('../models/student');

module.exports = {
    //Get All Students
    async index(req, res, next) {
        const students = await Student.find().lean();
        return res.json(students);
    },

    //Create New Student
    async create(req, res, next) {
        const newStudent = new Student({ ...req.body });
        const savedStudent = await newStudent.save();
        return res.json(savedStudent);
    },

    //Get Single Student
    async show(req, res, next) {
        const student = await Student.findOne({ "_id": req.params.id }).lean();
        return res.json(student);
    },

    //Update A Student
    async update(req, res, next) {
        const updatedStudent = await Student.findOneAndUpdate({ "_id": req.params.id }, { ...req.body }, { new: true });
        return res.json(updatedStudent);
    },

    //Destroy A Student
    async destroy(req, res, next) {
        const student = await Student.findOne({ _id: req.params.id });
        const deletedStudent = await student.remove();
        return res.json(deletedStudent);
    }
};