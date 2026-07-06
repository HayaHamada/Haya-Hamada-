exports.homePage = (req, res) => {
    res.render("index", {
        title: "MVC Project",
        message: "Welcome to MVC Project"
    });
};