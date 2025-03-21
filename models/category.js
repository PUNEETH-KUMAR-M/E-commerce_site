const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const categorySchema = Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    slug: "title",
  },
  imagePath: {
    type: String,
    default: function() {
      return this.slug + '.jpg';
    }
  }
});

module.exports = mongoose.model("Category", categorySchema);
