import app from "./app.js";

const port = process.env.PORT || 8080;

export default app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
