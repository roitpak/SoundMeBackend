import { Request, Response, Application } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";
// import log from "./logger"

const options: swaggerJsdoc.Options = {
    definition: {
        openai: "3.0.0",
        info: {
            title: 'Rest API docs',
            version
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            { bearerAuth: [], }
        ]
    },
    apis: ['@/resources/post/post.controller.ts',
        '@/resources/post/user.controller.ts']
}

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Application, port: number) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.get('docs.json', (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    console.info(`Docs available at http://localhost:${port}/docs`)
}
export default swaggerDocs;