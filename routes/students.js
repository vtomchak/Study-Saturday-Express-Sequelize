const router = require('express').Router();
const Student = require('../db/models/student');

router.get("/", async (req, res, next) => {
    try {
      const students = await Student.findAll();
      res.send(students);
    } catch (error) {
      next(error);
    }
  });


  router.get("/:id", async (req, res, next) => {
    try {
        const student = await Student.findByPk(req.params.id)
        if (student){
            res.send(student);
        } else {
            res.status(404).send('Student Id not found');
        }
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async (req, res, next)=> {
      try {
          const newStudent = await Student.create({
              firstName: req.body.firstName,
              lastName : req.body.lastName,
              email : req.body.email,

          });
          res.status(201).json(newStudent);
      } catch (error){ next(error);} 
     });

//      const student = await Student.Update({ firstName: req.body.firstName,
//         lastName : req.body.lastName,
//         email : req.body.email}, {
//             where: {id: req.params.id},
//             returning: true,
//             plain: true,
//         });
//  res.status(200).send(student[1]);
     router.put("/:id", async (req, res, next) => {
        try {
        const [num, updatedStudent] = await Student.update(req.body, {
            returning: true,
            where:  {id: req.params.id}
        })
        
                res.status(200).send(updatedStudent[0]);
    
        } catch (error) {
          next(error);
        }
      });
    

module.exports = router;
