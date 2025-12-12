import express from "express";
import dotenv from 'dotenv'
import path from "path";
import { User } from "db/client";

dotenv.config({path:  path.resolve(__dirname, '../../.env')});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes required
// signup
// signin
// post /workflow
// put /workflow/:id
// get /workflow/:id
// get /workflows/executions/:id    
// post+put /credentails
// get /credentials

app.listen(process.env.PORT || 3000, () => {
    console.log("Http server is running on http://localhost:3000");
});