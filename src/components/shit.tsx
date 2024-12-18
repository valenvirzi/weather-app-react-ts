function App() {
  const bgImage =
    "https://images.unsplash.com/photo-1501691223387-dd0500403074?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFpbnxlbnwwfHwwfHx8MA%3D%3D";
  return (
    <div
      className={`app relative min-h-screen bg-cover bg-[url(${bgImage})`}
    ></div>
  );
}
export default App;
