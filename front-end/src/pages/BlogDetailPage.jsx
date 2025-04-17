import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Share2, Bookmark } from "lucide-react";
import Heading from "../sections/Heading";
import top_10_gift_ideas from "../assets/images/top-10 handmade gifts.webp";
import the_art_of_handcrafted_decor from "../assets/images/the art decor2.jpg";
import sustainable_craft from "../assets/images/sustainable.avif";

const blogs = [
  {
    id: 1,
    title: "The Art of Handcrafted Decor",
    content: `Moreover, handcrafted decor connects you emotionally to the maker. There's something magical about knowing the person behind the product — 
their story, their passion, and the tradition that shaped their craft. It transforms your home into a gallery of stories, 
where every piece has a meaning beyond its look.

When you support handcrafted goods, you're also promoting fair trade practices. Artisans often work in small, local communities 
and depend on direct sales to earn a living. Buying directly from them or ethical marketplaces ensures your money goes where it truly matters.

In an age of fast consumption and throwaway culture, choosing handmade is a conscious step towards slower, meaningful living. 
It helps reduce waste, promotes local talent, and enriches your space with heritage.

You can also personalize many handcrafted items to fit your space. Prefer a clay pot in a specific shade? 
Artisans are more than happy to co-create something just for you.

Whether it's gifting or decorating your home, handcrafted items bring purpose, artistry, and sustainability together in one perfect package.

Here's how you can support artisans regularly:
- Visit local art fairs and exhibitions.
- Shop from verified online marketplaces that promote handmade goods.
- Share artisan work on social media and help spread the word.
- Gift handmade — it's always more thoughtful and memorable.

So, let your space breathe culture, tradition, and soul. Because when you choose handcrafted, you're not just buying a product — 
you're preserving an artform.`,
    date: "March 15, 2025",
    author: "Team ExclusiveLane",
    image: the_art_of_handcrafted_decor,
    readTime: "5 min read",
    category: "Decor",
  },
  {
    id: 2,
    title: "Top 10 Handmade Gift Ideas",
    content: `Looking for a meaningful gift? Handmade items offer thoughtfulness, uniqueness, and warmth. They carry the personal 
touch of the maker and show the receiver that you truly care. Whether it's for a birthday, anniversary, or any celebration, 
here are our top 10 handmade gift ideas:

1. Hand-painted Mugs
2. Personalized Wooden Name Plates
3. Crochet Keychains
4. Miniature Clay Figurines
5. Handwritten Letters or Poems
6. Handmade Candles
7. Organic Bath Kits
8. Hand-stitched Bags
9. Beaded Bracelets
10. Customized Sketch Portraits

Remember, handmade gifts are not just objects—they are memories. They bring a sense of joy that no factory-made item can.

In today's fast-paced world where everything is mass-produced, taking time to select or create a handmade gift shows deep affection. 
It tells the recipient that their happiness matters enough for you to invest your time and effort.

Many handmade gifts are also customizable. You can choose colors, designs, and even add names or messages. For example, 
a wooden nameplate can have a heartfelt quote, and a sketch portrait can be based on your favorite photo together.

Another reason why handmade gifts are so valuable is the craftsmanship. Behind every crochet, brush stroke, or carve, 
there's a story — a person who put their heart into creating it. It makes the gift more than just a "thing" — it becomes an experience.

Supporting handmade also means supporting local artisans and small businesses. When you buy handcrafted items, 
you're directly helping someone pursue their passion and sustain their livelihood. It creates a meaningful impact beyond the gift.

You can even make your own handmade gifts — a DIY photo album, a jar of personalized notes, or a knitted scarf — 
things that cost little money but carry immense emotional weight.

So next time you're searching for a gift, skip the mall and consider the handcrafted route. Because handmade is heartfelt, 
and the joy it brings lasts much longer than the moment it is received.`,
    date: "February 28, 2025",
    author: "Tushal Sharma",
    image: top_10_gift_ideas,
    readTime: "7 min read",
    category: "Gifts",
  },
  {
    id: 3,
    title: "Why Sustainable Craft Matters",
    content: `Sustainability is not just a buzzword—it's a responsibility. And when it comes to craft and decor, choosing sustainable 
handmade products can make a big impact. Here's how:

- Eco-friendly Materials: Most artisans use natural, biodegradable materials.
- Less Carbon Footprint: Handmade goods don't require large factories or emissions.
- Cultural Preservation: Buying handmade supports traditional skills that are fading away.

Imagine a world where each item in your home has meaning. A jute basket from Assam, a clay water pot from Gujarat, or a 
bamboo lamp from Nagaland. Each of these not only beautifies your home but also supports the planet.

Sustainable craft isn't just about style—it's about values. It's about choosing slow, conscious living.

In today's industrialized world, mass-produced items are often made with plastic, chemicals, and synthetic materials 
that harm the environment. On the other hand, sustainable handmade goods are made with love, time, and care, often using 
local resources and age-old techniques that are both earth-friendly and culturally rich.

Supporting such crafts means keeping traditions alive. Many tribal and rural communities across India and the world have 
survived on handcrafted goods for generations. By buying their work, you're not just decorating your space—you're 
helping preserve a legacy.

Moreover, sustainable handmade decor pieces are often one-of-a-kind. Each product has imperfections that make it perfect— 
the uneven texture of clay, the hand-painted strokes on fabric, or the natural variation in wood grains. These are not flaws, 
but marks of authenticity.

Choosing sustainable crafts also encourages minimalism. When you buy with intention, you buy less, and you buy better. 
Instead of cluttering your home with meaningless decor, you fill it with meaningful, purposeful art that speaks of earth, 
culture, and compassion.

As consumers, every rupee you spend is a vote. So next time you shop, ask yourself—am I buying just a product or am I 
investing in a better planet?

Remember: Sustainability isn't about being perfect. It's about making better choices, one handcrafted product at a time.`,
    date: "January 20, 2025",
    author: "Guest Writer",
    image: sustainable_craft,
    readTime: "6 min read",
    category: "Sustainability",
  },
];

const BlogDetailPage = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id || "0"));

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Blog not found</h1>
        <Link to="/" className="text-blue-500 hover:text-blue-700 flex items-center gap-2">
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section with Image */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm font-medium">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  {blog.category}
                </span>
                <span>{blog.readTime}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                {blog.title}
              </h1>
              <div className="flex items-center gap-4 text-white/80">
              
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={blog.date}>{blog.date}</time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {blog.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-6 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

      </div>
    </article>
  );
};

export default BlogDetailPage;