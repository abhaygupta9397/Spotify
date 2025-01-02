import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import { Button } from "./components/ui/button"

function App() {

  return (
    <>
     <header>
      <SignedOut>
        <SignInButton><Button>Sign In</Button></SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
    <Button variant="outline">This is a button</Button>
      <h1 className="text-red-500">Hello</h1>
    </>
  )
}

export default App
