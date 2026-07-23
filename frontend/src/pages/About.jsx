const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Our Story</h1>

      <div className="space-y-4 text-gray-700 mb-12">
        <p>
          Click-Chop started with a simple idea: getting a good meal shouldn't be complicated.
          Whether you're craving a smoky pot of jollof rice, a rich bowl of egusi soup, or just
          a cold drink after a long day, we wanted ordering to feel as easy as it sounds - a few
          clicks, and your food is on the way.
        </p>
        <p>
          We work with a kitchen that treats every dish with the same care as a home-cooked meal,
          using fresh ingredients and recipes rooted in real Nigerian cooking. From our rice
          dishes to our soups, proteins, drinks, and desserts, every category on our menu is
          built around dishes people actually want to eat again.
        </p>
        <p>
          Click-Chop is more than an app - it's our way of bringing good food closer to you,
          one order at a time.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="border border-gray-200 rounded-xl p-6 text-center">
          <p className="text-3xl font-bold text-terracotta-600 mb-1">25+</p>
          <p className="text-sm text-gray-500">Menu Items</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-6 text-center">
          <p className="text-3xl font-bold text-terracotta-600 mb-1">5</p>
          <p className="text-sm text-gray-500">Categories</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-6 text-center">
          <p className="text-3xl font-bold text-terracotta-600 mb-1">Fast</p>
          <p className="text-sm text-gray-500">Delivery</p>
        </div>
      </div>
    </div>
  );
};

export default About;
