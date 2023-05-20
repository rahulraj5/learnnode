const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id : 1, name : 'course1'},
    { id : 2, name : 'course2'},
    { id : 3, name : 'course3'},
    { id : 4, name : 'course4'},
];

app.get('/', (req, res) => {
    res.send('hello world');
});

// app.get('/api/courses', (req, res) => {
//     res.send([1,2,3]);
// });

// app.get('/api/courses/:id', (req, res) => {
//     res.send(req.params.id);
// });

app.get('/api/posts/:year/:mon', (req, res) => {
    res.send(req.params);
});

app.get('/api/posts/:year/:mon', (req, res) => {
    res.send(req.query);
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found');
    res.send(course);
    // res.send(req.params.id);
    // res.send('hello');
});

// app.post('/api/courses', (req, res) => {
//     // console.log(req.body.name);
//     if(!req.body.name || req.body.name < 3){
//         // 400 Bad Request
//         res.status(400).send('Name is required and should be minimum 3 character');
//         return;
//     }

//     const course = {
//         id: courses.length + 1,
//         name: req.body.name
//     };
//     courses.push(course);
//     res.send(course);
// });

// app.post('/api/courses', (req, res) => {
//     const schema = {
//         name: Joi.string().min(3).required()
//     };
//     if(!req.body.name || req.body.name < 3){
//         // 400 Bad Request
//         res.status(400).send('Name is required and should be minimum 3 character');
//         return;
//     }

//     const course = {
//         id: courses.length + 1,
//         name: req.body.name
//     };
//     courses.push(course);
//     res.send(course);
// });

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found')

    const { error } = validateCourse(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found')

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})

function validateCourse(course){
    const schema ={
        name : Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

// app.post()
// app.put()
// app.delete()

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}...`));