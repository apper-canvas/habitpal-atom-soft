const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to HabitPal</h1>
          <p className="text-gray-600 mt-2">Track your habits and build better routines</p>
        </header>
        
        <main>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Get Started</h2>
            <p className="text-gray-600">
              Your habit tracking journey begins here. Start building positive habits today!
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;