const express = require('express');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// goes to index file in routes
app.use(require('./routes'));

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`💻 Now listening on http://localhost:${PORT}`)
    })
});