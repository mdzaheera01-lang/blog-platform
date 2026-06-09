const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/blogDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  comments: [String]
});

const Blog = mongoose.model("Blog", blogSchema);

// Create Blog
app.post("/blogs", async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.json(blog);
});

// Get Blogs
app.get("/blogs", async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

// Add Comment
app.put("/blogs/:id/comment", async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  blog.comments.push(req.body.comment);

  await blog.save();

  res.json(blog);
});

// Delete Blog
app.delete("/blogs/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});