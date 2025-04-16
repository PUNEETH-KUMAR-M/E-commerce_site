import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
const Schema = mongoose.Schema;

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

export default mongoose.model("Category", categorySchema);
