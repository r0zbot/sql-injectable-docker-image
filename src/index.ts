import express from "express";
import { Client } from "pg";
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 3000;
const PG_HOST = process.env.PG_HOST || 'postgres';

const client = new Client({
  password: "postgres",
  user: "postgres",
  host: "postgres",
});

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/form', (req, res) => {
  res.send(`
        <form action="/login" method="post">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" name="username">
            </div>
            
            <div>
                <label for="pass">Password</label>
                <input type="password" id="password" name="password">
            </div>
            <input type="submit" value="Sign in">
        </form>
    `)
});

app.get('/', (req, res) => {
  res.send(`
        <a href='/form'> see the login form here</a>
    `)
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
  console.log(query);
  client.query(query, (err, qres) => {
    try {
      if (qres.rows.length !== 0) {
        res.send(`<h1>Welcome ${qres.rows[0].name}</h1>`);
      } else {
        res.send(`incorrect username or passwords`);
      }
    } catch (e) {
      res.send(`${e} <br/> ${qres} <br/> ${err}`);
    }
  })
});

(async () => {
  await client.connect();

  app.listen(PORT, () => {
    console.log("Started at http://localhost:%d", PORT);
  });
})();