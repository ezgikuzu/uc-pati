export default function PageContainer({ children }) {
  return (
    <main className="bg-[#f3f8f7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        {children}
      </div>
    </main>
  );
}