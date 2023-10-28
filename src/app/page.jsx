import CalculatorForm from "@/Components/CalculatorForm/CalculatorForm"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="wrapper">
        <CalculatorForm />
      </div>
    </main>
  )
}
