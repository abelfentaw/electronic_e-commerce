// About.jsx
import React from "react";

const About = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          Our mission is to provide top-quality products with exceptional
          customer service, making online shopping convenient, secure, and
          enjoyable. We aim to be a leading e-commerce platform by continually
          enhancing user experience and ensuring customer satisfaction.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Products</h2>
        <p className="text-gray-700 leading-relaxed">
        Whether you're a tech enthusiast or just looking for reliable devices,
        
         our collection of electronics offers the latest in innovation and functionality.
          From powerful laptops and smartphones to smart home devices and high-quality audio equipment,
           each product is selected with your needs in mind. We aim to bring you the best in technology,
            making sure every device offers reliability, performance, and the latest features to enhance your daily life..
            When it comes to electronics, we know quality is paramount. Every product in our catalog is selected based on 
            quality assurance tests and real customer feedback. This way, we ensure that each device not only performs well
             but also meets our customers' expectations. We’re committed to helping you shop with confidence, so you can 
             rely on your purchases to work seamlessly and reliably.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Our Commitment to Quality
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Quality and trust are at the core of our values. We strive to ensure
          every item meets our high standards, and we prioritize feedback from
          our customers to continually improve. Whether you’re shopping for
          yourself or others, you can trust that each product reflects our
          commitment to excellence.
        </p>
      </section>
    </div>
  );
};

export default About;
