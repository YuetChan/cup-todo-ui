import GoogleButton from '../components/google-button'
import NavBar from '../components/nav-bar'

export default function SignIn() { 
  return (
    <div>
      <NavBar/>
      <div 
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        
          padding: "74px 0px 0px 0px",

          fontSize: "19px",
          color: "#0B214A"
      }}>
        <div>Sign in with one of below accounts</div>
        
        <div style={{
          display: "flex",
          flexDirection: "row",
          margin: "19px 0px 0px 0px"
        }}>
          <GoogleButton text={"Google"}/>
        </div>
      </div>
    </div>
  )
}
