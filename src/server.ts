import app from "./app";
import { AppDataSource } from "./data-source";

const port: number = Number(process.env.PORT) || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
