const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">Get in Touch</h1>
      <p className="text-gray-600 mb-10">
        Questions about an order, feedback, or just want to say hi? We'd love to hear from you.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-500 mb-1">Phone</p>
          <p className="font-semibold">+234 801 234 5678</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-500 mb-1">Email</p>
          <p className="font-semibold">hello@clickchop.com</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-500 mb-1">Address</p>
          <p className="font-semibold">Lekki, Lagos, Nigeria</p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert('Thanks for reaching out! We will get back to you soon.');
          e.target.reset();
        }}
        className="space-y-4 max-w-lg"
      >
        <h2 className="text-xl font-semibold mb-2">Send us a message</h2>
        <input
          type="text" placeholder="Your name" required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta-500"
        />
        <input
          type="email" placeholder="Your email" required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta-500"
        />
        <textarea
          placeholder="Your message" required rows={4}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta-500"
        />
        <button
          type="submit"
          className="bg-terracotta-600 text-white px-6 py-2 rounded-lg hover:bg-terracotta-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;