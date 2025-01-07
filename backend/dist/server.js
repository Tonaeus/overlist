import express from "express";
const app = express();
const PORT = 1234;
app.get("/", (req, res) => {
    const headers = req.headers;
    resizeBy.status(200).send("Hello world!");
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map