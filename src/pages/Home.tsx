export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Ahmed Fakhfakh
        </h1>
        <p className="text-xl text-gray-600 mb-8">Senior Fullstack Developer</p>
        <p className="text-lg text-gray-500 mb-8">
          Expert in React, Angular, NestJS, and modern web technologies
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 text-lg">
          View My Work
        </button>
      </section>
    </div>
  );
}
