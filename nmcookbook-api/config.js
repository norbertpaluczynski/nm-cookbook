import { POSTGRESQL_DEFAULT_CONFIG } from 'node-liquibase'

export const PORT = process.env.PORT || 8000

export const liquibaseConfig = {
    ...POSTGRESQL_DEFAULT_CONFIG,
    changeLogFile: './resources/db/liquibase/changeLog.xml',
    url: 'jdbc:postgresql://localhost:5432/nmdrinkbook',
    username: 'nmdrinkbook',
    password: 'nmdrinkbook',
}

export const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "NM Drinkbook API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: `http://localhost:${PORT}`,
			},
		],
	},
	apis: ["./routes/*.js"],
}
