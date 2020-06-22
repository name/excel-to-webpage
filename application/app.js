const app = require('express')();
const port = 4000

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/excel', (req, res) => {
    var XLSX = require('xlsx');
    var workbook = XLSX.readFile('excel/example.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var output = '';
    sheet_name_list.forEach(function(y) {
        var worksheet = workbook.Sheets[y];
        var headers = {};
        var data = [];
        for(z in worksheet) {
            if(z[0] === '!') continue;
            //parse out the column, row, and value
            var tt = 0;
            for (var i = 0; i < z.length; i++) {
                if (!isNaN(z[i])) {
                    tt = i;
                    break;
                }
            };
            var col = z.substring(0,tt);
            var row = parseInt(z.substring(tt));
            var value = worksheet[z].v;

            //store header names
            if(row == 1 && value) {
                headers[col] = value;
                continue;
            }

            if(!data[row]) data[row]={};
            data[row][headers[col]] = value;
        }
        //drop those first two rows which are empty
        data.shift();
        data.shift();
        console.log(data);
        output = data;
    });
    res.render('excel', { output : output })
});

app.listen(port, console.log(`Server listening at http://localhost:${port}`));