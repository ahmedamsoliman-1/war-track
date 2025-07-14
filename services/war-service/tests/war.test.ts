import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../src/app";
import { IWar } from "../src/models/war.model";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("War API", () => {
  let warId: string;

  it("should create a war", async () => {
    const response = await request(app)
      .post("/api/wars")
      .send({
        title: "Test War",
        description: "A test war for unit tests",
        startDate: "2020-01-01",
        endDate: "2020-12-31",
        involvedCountries: ["Country A", "Country B"],
        casualties: 1000,
        geoData: {
          type: "Polygon",
          coordinates: [
            [
              [30, 10],
              [40, 40],
              [20, 40],
              [10, 20],
              [30, 10]
            ]
          ]
        }
      })
      .expect(201);

    expect(response.body._id).toBeDefined();
    warId = response.body._id;
  });

  it("should fetch the created war by ID", async () => {
    const response = await request(app)
      .get(`/api/wars/${warId}`)
      .expect(200);

    expect(response.body._id).toBe(warId);
    expect(response.body.title).toBe("Test War");
  });

  it("should fetch all wars", async () => {
    const response = await request(app)
      .get("/api/wars")
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  it("should update the war", async () => {
    const response = await request(app)
      .put(`/api/wars/${warId}`)
      .send({
        title: "Updated Test War",
        description: "Updated description",
        casualties: 2000
      })
      .expect(200);

    expect(response.body.title).toBe("Updated Test War");
    expect(response.body.casualties).toBe(2000);
  });

  it("should delete the war", async () => {
    await request(app)
      .delete(`/api/wars/${warId}`)
      .expect(200);

    // Verify it's gone
    await request(app)
      .get(`/api/wars/${warId}`)
      .expect(404);
  });
});
