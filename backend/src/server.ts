import express, { Request, Response } from "express";

const app = express();
const PORT = 1234;

app.get("/", (req: Request, res: Response) => {
    const headers = req.headers;
    res.status(200).send("Hello world!");
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
