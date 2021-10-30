import express from 'express'
import { Liquibase } from 'node-liquibase'
import swaggerUI from 'swagger-ui-express'
import { PORT, liquibaseConfig, swaggerOptions } from './config.js'
import recipesRouter from './routes/recipes.js'
import { readFile } from 'fs/promises'

const instTs = new Liquibase(liquibaseConfig);
instTs.update();

const app = express()

const swaggerJson = JSON.parse(
  await readFile(new URL('./swagger.json', import.meta.url))
)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.use("/recipes", recipesRouter)

app.listen(PORT, () => {
  //console.log(`App listening at http://localhost:${PORT}`)
})
