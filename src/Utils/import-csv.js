import fs from 'node:fs';
import { parse } from 'csv-parse';

const csvPath = new URL('./tasks.csv', import.meta.url);
const csvParse = parse({
    delimiter: ';',
    skipEmptyLines: true,
    fromLine: 2
});

async function importCsv(){

    fs.createReadStream(csvPath).pipe(csvParse)
    .on('data', async (rows) => {
        const [title, description] = rows;
        
        await fetch('http://localhost:3001/tasks', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({title,description})
        })    
        })
    .on('end', () => {
        console.log('Csv file successfully processed!');
    });     

}

importCsv()