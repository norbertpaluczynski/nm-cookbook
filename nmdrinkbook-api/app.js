import express from 'express'
import { Liquibase } from 'node-liquibase'
import swaggerUI from 'swagger-ui-express'
import { PORT, liquibaseConfig, swaggerOptions } from './config.js'
import recipeRouter from './routes/recipe.router.js'
import recipeListRouter from './routes/recipelist.router.js'
import ingredientRouter from './routes/ingredient.router.js'
import articleRouter from './routes/article.router.js'
import categoryRouter from './routes/category.router.js'
import ratingRouter from './routes/rating.router.js'
import stateRouter from './routes/state.router.js'
import unitRouter from './routes/unit.router.js'
import statRouter from './routes/stat.router.js'
import ingredientListRouter from './routes/ingredientlist.router.js'
import recipeHeaderRouter from './routes/recipeheader.router.js'
import recipeCategoriesRouter from './routes/recipecategories.router.js'
import recipeDetailsRouter from './routes/recipedetails.router.js'
import { readFile } from 'fs/promises'
import jwtDecoder from './middleware/jwtDecoder.js'
import cors from 'cors'

const instTs = new Liquibase(liquibaseConfig);
instTs.update();

const app = express()

app.use(jwtDecoder)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

const swaggerJson = JSON.parse(
  await readFile(new URL('./swagger.json', import.meta.url))
)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.use("/article", articleRouter)
app.use("/category", categoryRouter)
app.use("/ingredient", ingredientRouter)
app.use("/rating", ratingRouter)
app.use("/recipe", recipeRouter)
app.use("/state", stateRouter)
app.use("/unit", unitRouter)
app.use("/stat", statRouter)
app.use("/recipelist", recipeListRouter)
app.use("/ingredientlist", ingredientListRouter)
app.use("/recipeheader", recipeHeaderRouter)
app.use("/recipecategories", recipeCategoriesRouter)
app.use("/recipedetails", recipeDetailsRouter)

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})