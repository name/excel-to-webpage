const app = require('express')();
const port = 4000

app.get('/', (req, res) => {
    res.send('root');
});

app.listen(port, console.log(`Server listening at http://localhost:${port}`));