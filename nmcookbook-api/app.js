import express from 'express'
import { Liquibase } from 'node-liquibase'
import swaggerUI from 'swagger-ui-express'
import { PORT, liquibaseConfig, swaggerOptions } from './config.js'
import recipesRouter from './routes/recipe.router.js'
import ingredientRouter from './routes/ingredient.router.js'
import { readFile } from 'fs/promises'

const instTs = new Liquibase(liquibaseConfig);
instTs.update();

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const swaggerJson = JSON.parse(
  await readFile(new URL('./swagger.json', import.meta.url))
)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.use("/recipe", recipesRouter)
app.use("/ingredient", ingredientRouter)

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})




// const recipe = Recipe.build({
  // title: 'title',
  // description: 'description',
  // preparationSteps: 'preparationSteps',
  // preparationTime: 5,
  // difficultyLevel: 4,
  // image: 'image'
// })

// console.log(recipe instanceof Recipe)
// console.log(recipe)

// await recipe.save().catch(error => console.log(error))
