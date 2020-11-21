const router = require('express').Router();
const Test = require('../db/models/test');
const Student = require('../db/models/student');

//GET //TESTS

router.get('/', async (req, res, next) => {
    try {
      const tests = await Test.findAll();
      res.send(tests)
    } catch (error) {
      next(error)
    }
  });

  //GET TEST by :ID
  router.get('/:specificId', async (req, res, next) => {
    try {
      let test = await Test.findByPk(req.params.specificId)
      if (test) {
        res.send(test)
      } else {
        res.status(404).send('Test not found')
      }
    } catch (error) {
      next(error)
    }
  });

  router.post('/student/:studentId', async (req, res, next) => {
    try {
      let newTest = await Test.create(req.body);
      //create new test instance with input 
      let student = await Student.findByPk(req.params.studentId);
      // find student by student Id number associated
      let studentTest = await newTest.setStudent(student);
      // create association through the earlier association defined on model page
      // Test.belongsTo(Student, { as: 'student' });   <-- this line on /models/test
     
      res.status(201).send(studentTest)
    } catch (err) {
      next(err)
    }
  });

  // DELETE /TESTS/:ID

  router.delete('/:id', async(req, res, next) => {
      try {
          await Test.destroy({where: {
              id: req.params.id,
          },
        });
        // res.status(204).send('its deleted');
        res.sendStatus(204);
        // have to send something back
      } catch (error) {
          next(error);
      }
  } )

module.exports = router;
