import React from 'react';
import top_10_gift_ideas from "../assets/images/top-10 handmade gifts.webp";
import the_art_of_handcrafted_decor from "../assets/images/the art decor2.jpg";
import sustainable_craft from "../assets/images/sustainable.avif";
import { Link } from "react-router-dom";
import Heading from '../sections/Heading';

const blogs = [
  {
    id: 1,
    title: "The Art of Handcrafted Decor",
    summary: "Explore how handcrafted products add a personal and artistic touch to your home.",
    date: "March 15, 2025",
    author: "Team ExclusiveLane",
    image: the_art_of_handcrafted_decor,
  },
  {
    id: 2,
    title: "Top 10 Handmade Gift Ideas",
    summary: "Whether it's a birthday or a housewarming, discover meaningful handmade gift inspirations.",
    date: "February 28, 2025",
    author: "Tushal Sharma",
    image: top_10_gift_ideas,
  },
  {
    id: 3,
    title: "Why Sustainable Craft Matters",
    summary: "Learn how handcrafted goods contribute to eco-friendly and ethical living.",
    date: "January 20, 2025",
    author: "Guest Writer",
    image: sustainable_craft,
  },
];

const BlogPage = () => {
  return (
    <div className="w-full mx-auto  bg-white text-gray-800">
      {/* Header Section */}

      <Heading heading="Our Blog" subheading="Latest stories, tips & ideas from the world of handcrafted elegance" />

      {/* Blog Cards Section */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-0 py-6 sm:py-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white shadow-md rounded-2xl overflow-hidden transition-transform hover:scale-[1.02]">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-5">
              <p className="text-xs text-gray-500 mb-1">{blog.date} · {blog.author}</p>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{blog.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{blog.summary}</p>
              <Link to={`/BlogPage/${blog.id}`} className="text-blue-600 text-sm font-medium hover:underline">
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default BlogPage;
