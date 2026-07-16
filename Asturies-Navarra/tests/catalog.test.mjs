import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const catalog = JSON.parse(await readFile(new URL("../public/data/activities.json", import.meta.url), "utf8"));

test("el catàleg conté les 160 activitats documentades", () => {
  assert.equal(catalog.activities.length, 160);
  assert.equal(catalog.activities.filter((item) => item.region === "Astúries").length, 88);
  assert.equal(catalog.activities.filter((item) => item.region === "Navarra").length, 72);
});

test("totes les activitats tenen una justificació i camps geogràfics", () => {
  for (const activity of catalog.activities) {
    assert.ok(activity.appeal.length >= 12, activity.name);
    assert.ok(Object.hasOwn(activity, "latitude"), activity.name);
    assert.ok(Object.hasOwn(activity, "longitude"), activity.name);
    assert.ok(["àncora", "complement"].includes(activity.role), activity.name);
    assert.ok(Array.isArray(activity.weather), activity.name);
    assert.equal(typeof activity.bookingRecommended, "boolean", activity.name);
  }
});
