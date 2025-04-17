import React from 'react';
import Heading from '../sections/Heading';

const OurVision = () => {
  return (
    <div className="w-full mx-auto bg-white text-gray-800">
      {/* Header Section */}
      <Heading heading="Our Vision" subheading="Crafting a better tomorrow with timeless artistry" />

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0 py-4 sm:py-8 text-justify space-y-6">
        <p className="text-base leading-relaxed">
          At <strong>Hands & Craft</strong>, our vision is rooted in a deep admiration for the human touch in every creation. We strive to build a world where handcrafted products are not just admired, but cherished. Our dream is to connect modern consumers with ancient traditions through authentic, handmade art that reflects the heart and heritage of its makers.
        </p>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Preserving Cultural Heritage</h2>
          <p>
            We see art as a living history. Our mission is to preserve dying crafts by bringing them into the spotlight. Be it Madhubani paintings from Bihar, Blue Pottery of Jaipur, or Channapatna toys from Karnataka — we make sure these crafts stay relevant by blending tradition with contemporary design. Every product is a living testament to India’s diverse culture and age-old legacy.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Empowering Artisans</h2>
          <p>
            Behind every handcrafted piece lies an artisan’s story — of patience, skill, and generations of wisdom. We don’t just work with artisans, we walk with them. By offering fair wages, consistent work, capacity-building workshops, and recognition, we aim to uplift entire communities and ensure their crafts continue to flourish with pride and dignity.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Sustainable & Ethical Practices</h2>
          <p>
            In a world driven by fast fashion and mass production, we choose the slow and mindful way. From natural dyes and eco-friendly materials to plastic-free packaging and minimal waste production — sustainability is not just a practice for us, it's a promise. Our aim is to nurture a circular economy where nature and craft go hand in hand.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Global Reach, Local Roots</h2>
          <p>
            While we continue to expand across international markets, our soul remains Indian. We are proud torchbearers of India’s handmade legacy, and our goal is to take its charm into homes around the world. With every shipment sent across borders, we carry a piece of India’s art and heart with us.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">A Vision for the Future</h2>
          <p>
            Our journey has just begun. In the coming years, we envision creating artisan hubs, organizing global craft exhibitions, and launching mentorship programs for young artisans. We want to become the voice of craft in the modern world — loud, proud, and impactful.
          </p>
        </div>

        <p className="text-base leading-relaxed">
          Join us in this journey — where every purchase you make isn’t just a product, but a purpose fulfilled. Let’s build a future where art is respected, artisans are celebrated, and homes are enriched with meaning and beauty.
        </p>
      </section>
    </div>
  );
};

export default OurVision;
