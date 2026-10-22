// loads express and the template engine.
const express = require("express");
const ejs = require("ejs");
const app = express();

// reads the fields sent by html forms.
app.use(express.urlencoded({ extended: false }));

// uses the scripting tags in the provided html pages.
app.engine("html", ejs.renderFile);
app.set("views", __dirname + "/html");

// stores the names and tasks while the server is running.
const names = [];
const tasks = [];

// shows the home page with all names and tasks.
app.get("/", (req, res) => {
    res.render("index.html", { names: names, tasks: tasks, error: "" });
});

// adds the submitted name and returns to the home page.
app.get("/greet", (req, res) => {
    const name = req.query.name;
    console.log(name);
    names.push(name);
    res.redirect("/");
});

// shows the selected name or passes an invalid index to the error handler.
app.get("/greet/:index", (req, res, next) => {
    const index = Number(req.params.index);

    if (names[index] === undefined) {
        return next(new Error("That name does not exist."));
    }

    res.render("wazzup.html", { name: names[index] });
});

// adds a name from the url and returns all names as json.
app.put("/greet/:name", (req, res) => {
    names.push(req.params.name);
    res.json(names);
});

// returns all tasks as json.
app.get("/task", (req, res) => {
    res.json(tasks);
});

// adds the submitted task and returns to the home page.
app.post("/task", (req, res) => {
    tasks.push(req.body.task);
    res.redirect("/");
});

// moves a task up or down by swapping it with the task beside it.
app.post("/task/order", (req, res) => {
    const index = Number(req.body.index);
    const newIndex = index + Number(req.body.move);

    // swaps the tasks only if the new position is inside the list.
    if (newIndex >= 0 && newIndex < tasks.length) {
        const task = tasks[index];
        tasks[index] = tasks[newIndex];
        tasks[newIndex] = task;
    }

    res.redirect("/");
});

// deletes the selected task and redirects to the home page with a get request.
app.delete("/task", (req, res) => {
    const index = Number(req.query.index);
    tasks.splice(index, 1);
    res.redirect(303, "/");
});

// shows the invalid greeting index error on the home page.
app.use((error, req, res, next) => {
    res.render("index.html", {
        names: names,
        tasks: tasks,
        error: error.message
    });
});

// starts the server.
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
