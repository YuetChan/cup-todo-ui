import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import NavBar from "../components/nav-bar";

import { isJwtEmptyOrInvalid } from "../util/jwt-util";
import { getSessionUserEmail } from "../util/user-util";
import { getRequestsByEmail } from "../util/request-report-util";

import Moment from "react-moment";

export default function UserHome() {
  const router = useRouter();

  const [ requests, setRequests ] = useState([]);

  const handleReadyClick = (id) => {
    router.push(`${ process.env.NEXT_PUBLIC_DOMAIN }/reports/censored?requestId=${id}`);
  }

  const handleInProgressClick = (id) => {
    router.push(`${ process.env.NEXT_PUBLIC_DOMAIN }/requests/${id}`);
  }

  useEffect(() => {
    if(!isJwtEmptyOrInvalid()) {
      getRequestsByEmail(getSessionUserEmail()).then(res => {
        if(res.length > 0) {
          setRequests(res);
        }else {
          alert("Opps, you dont have any esitmation request.")
          router.push(`${ process.env.NEXT_PUBLIC_DOMAIN }/new-request`);
        }
      }).catch(err => {
        alert("Opps. Something is wrong.");
        router.push(`${ process.env.NEXT_PUBLIC_DOMAIN }`);
      });
    }else {
      router.push(`${ process.env.NEXT_PUBLIC_DOMAIN }`);
    }
  }, []);

  const requestsListItem = (date, id, status) => {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
  
        padding: "19px",
        margin: "19px 0px 0px 0px",
  
        border: "2px dashed",
        width: "513px",

        fontSize: "16px",
        textAlign: "left",

        position: "relative"
      }}>
        <div style={{ 
          position: "absolute", 
          right: "11px" 
        }}>
          { 
            status === 'ready'
            ?  <span>✅</span> 
            : <span>⛏️</span>
          }
        </div>

        <div>Request ID : { id }</div>

        <div>
          Estimation :&nbsp;  
          {
            status === 'ready'
            ? <a 
                href="javascript:void(0)" 
                onClick={ () => handleInProgressClick(id) }
              >
                <u>Ready</u>
              </a>
            : <a 
                href="javascript:void(0)" 
                onClick={ () => handleInProgressClick(id) }
              >
                <u>In progress</u>
              </a>
          } 
        </div>
        
        <div>
          Submitted Date :&nbsp;
          <Moment format="YYYY/MM/DD">{ date }</Moment>
        </div>
      </div>
    )
  }

  return (
    <div>
      <NavBar/>

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        
        padding: "74px 0px 37px 0px",

        fontSize: "19px",
        color: "#0B214A"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          <div><b>Note</b></div>
        
          <div style={{
            margin: "11px 0px 0px 0px",
            fontSize: "16px",
          }}>
            <div>
            ◾️ ✅ &#8594; Estimation is ready.
            </div>
            <div>
            ◾️ ⛏️ &#8594; Estimation is in progress.
            </div>
          </div>
        </div>



        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          margin: "37px 0px 0px 0px",
        }}>
          <div><b>Estimation Request List</b></div>

          <div style={{
            margin: "19px 0px 0px 0px",
            padding: "0px 19px 19px 19px",

            height: "calc(100vh - 160px)",

            borderTop: "1px solid",
            overflow: "auto",
          }}>
            { 
              requests.map(req => {
                return requestsListItem(req.createdAt, req.id, req.unlocked? "ready" : "inprogress");
              })
            }
          </div>
        </div>  


      </div>
    </div>
  );
}