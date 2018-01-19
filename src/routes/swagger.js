import koaRouter from "koa-joi-router";
import { SwaggerAPI } from "koa-joi-router-docs";

const router = koaRouter();

export default function generateApiDocs(routers) {
  const generator = new SwaggerAPI();
  for (let mrouter of routers) generator.addJoiRouter(mrouter);

  const spec = generator.generateSpec(
    {
      info: {
        title: "QA portal API",
        description: "API for getting questions and submitting answers.",
        version: "1.1"
      },
      basePath: "/",
      tags: [
        {
          name: "users",
          description: `A User represents a person who can login
                        and take actions subject to their granted permissions.
                        The user is authenticated via the header \`username\`
                        set by the API gateway`
        }
      ],
      headers: {
        username: {
          description: "Username of current logged in user, set by API gateway"
        }
      },
      securityDefinitions: {
        username: {
          type: "apiKey",
          name: "username",
          in: "header",
          description: "Enter any arbitrary username you want to imitate"
        }
      }
    },
    {
      defaultResponses: {} // Custom default responses if you don't like default 200
    }
  );

  for (const path in spec.paths) {
    for (const method in spec.paths[path]) {
      spec.paths[path][method].security = [{ username: [] }];
    }
  }

  router.get("/_api.json", async ctx => {
    ctx.body = JSON.stringify(spec, null, "  ");
  });

  /**
   * API documentation
   */
  router.get("/apiDocs", async ctx => {
    ctx.body = `<!DOCTYPE html>
                <html>
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <meta http-equiv="X-UA-Compatible" content="ie=edge">
                  <title>Base API</title>
                </head>
                <body>
                  <redoc spec-url='/_api.json' lazy-rendering></redoc>
                  <script src="https://rebilly.github.io/ReDoc/releases/latest/redoc.min.js"></script>
                </body>
                </html>
                `;
  });

  return router;
}
