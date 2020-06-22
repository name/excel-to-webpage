const app = require('express')();
const port = 4000

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
});

app.listen(port, console.log(`Server listening at http://localhost:${port}`));