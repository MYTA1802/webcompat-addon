/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

const AVAILABLE_UA_OVERRIDES = require("../src/data/ua_overrides");
const TEST_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:69.0) Gecko/20100101 Firefox/69.0";

describe("AVAILABLE_UA_OVERRIDES", () => {
  it("contains at least one UA override definition", () => {
    expect(AVAILABLE_UA_OVERRIDES.length).toBeGreaterThanOrEqual(1);
  });

  it("provide a unique ID for each override", () => {
    let ids = new Set();
    let duplicates = new Set();

    for (const override of AVAILABLE_UA_OVERRIDES) {
      let id = override.id;
      if (ids.has(id)) {
        console.error(`ID ${id} is not unique!`);
        duplicates.add(id);
      } else {
        ids.add(id);
      }
    }

    expect(duplicates.size).toBe(0);
  });
});

for (const override of AVAILABLE_UA_OVERRIDES) {
  describe(`override #${override.id}`, () => {
    it("provides an ID", () => {
      expect(override.id).toBeTruthy();
    });

    it("provides a valid platform", () => {
      expect(
        ["all", "desktop", "android"].includes(override.platform)
      ).toBeTruthy();
    });

    it("provides a domain", () => {
      expect(override.domain).toBeTruthy();
    });

    it("provides a bug ID", () => {
      expect(override.bug).toBeTruthy();
    });

    it("provides an URL scope", () => {
      expect(override.config.matches).toBeTruthy();
    });

    it("provides an uaTransformer that does return a string", () => {
      expect(override.config.uaTransformer(TEST_UA)).toEqual(
        jasmine.any(String)
      );
    });
  });
}
