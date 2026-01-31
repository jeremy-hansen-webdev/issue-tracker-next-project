import { faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import { makeIssues } from "../factories/issueFactory";

faker.seed(123);

export const handlers = [
  http.get("api/issues", () => {
    console.log(makeIssues)
    return HttpResponse.json(makeIssues())
  })
  ,

  http.post("/api/issues", async ({ request }) => {
    const body = (await request.json()) as {
      title?: string;
      description?: string;
    };

    if (!body.title || body.title.trim().length < 3) {
      return HttpResponse.json(
        {
          error: "Validation failed",
          issues: [
            {
              path: "title",
              message: "Title must be at least 3 characters long",
            },
          ],
        },
        { status: 400 },
      );
    }
    const created = {
      id: faker.number.int({ min: 1, max: 10_000 }),
      title: body.title,
      descriptions: body.description ?? null,
      createAt: new Date().toISOString(),
    };
    return HttpResponse.json(created, { status: 201 });
  }),
];
