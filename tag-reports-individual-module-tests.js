// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by tag-reports-individual-module.js.
import { name as packageName } from "meteor/tag-reports-individual-module";

// Write your tests here!
// Here is an example.
Tinytest.add('tag-reports-individual-module - example', function (test) {
  test.equal(packageName, "tag-reports-individual-module");
});
