const initServer = (app, p) => {
  const port = typeof p === "number" ? parseInt(p) : NaN;
  try {
    if (isNaN(port)) throw new Error(`Port should be a number`);
    if (!app.listen)
      throw new Error(
        "App constructor should be the one that is returned after invoking express"
      );
    app.listen(port, (err) => {
      if (err) throw new Error(err);
      console.log(`The application is listening on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = initServer;
