import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: `
          radial-gradient(circle at top, rgba(79,140,255,0.18), transparent 40%),
          linear-gradient(180deg, #0B0F19 0%, #121826 100%)
        `,
        color: "#E6EAF2",
      }}
    >
      <AppRoutes />
    </div>
  )
}

export default App