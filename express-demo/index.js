const express = require('express');
const app = express();

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

// app.post()
// app.put()
// app.delete()

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}...`));