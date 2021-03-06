import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import NavBar from "../components/nav-bar";
import QueueGrid from "../components/queue-grid";

import { isJwtEmptyOrInvalid } from "../util/jwt-util";
import { getSessionUserEmail } from "../util/user-util";
import { getLastUnestimatedRequest, getRequestById, getRequestsByEmail } from "../util/request-report-util";

import Moment from "react-moment";

const UserHome = () => {
  const router = useRouter();

  const [ requests, setRequests ] = useState([]);

  const [ userLastRequest, setUserLastRequest ] = useState();
  const [ lastEstimatedRequest, setLastEstimatedRequest ] = useState();

  const handleReadyClick = (id) => { router.push(`${ process.env.NEXT_PUBLIC_DOMAIN }/reports/censored?requestId=${id}`); }
  const handleInProgressClick = (id) => { router.push(`${ process.env.NEXT_PUBLIC_DOMAIN }/requests/${id}`); }

  useEffect(() => {
    if(!isJwtEmptyOrInvalid()) {
      getLastUnestimatedRequest().then(res => {
        console.log(res);
        setLastEstimatedRequest(res);
      }).catch(err => {
        console.log(err);
      })

      getRequestsByEmail(getSessionUserEmail()).then(res => {
        if(res.length > 0) {
          setRequests(res);

          let latestRequest = null;
          res.forEach(request => {
            if(latestRequest === null) {
              latestRequest = request;
            }else {
              latestRequest = latestRequest.createdAt >= request ? latestRequest : request; 
            }
          });

          getRequestById(latestRequest.id).then(res => {
            console.log(res)
            setUserLastRequest(res);
          })
        }else {
          alert("Opps, you dont have any esitmation request.")
          router.push(`${ process.env.NEXT_PUBLIC_DOMAIN }/new-request`);
        }
      }).catch(err => {
        console.log(err);

        alert("Opps. Something is wrong.");
        router.push(`${ process.env.NEXT_PUBLIC_DOMAIN }`);
      });
    }else {
      router.push(`${ process.env.NEXT_PUBLIC_DOMAIN }`);
    }
  }, []);

  const estimationsListItem = (date, id, status) => {
    return (
      <div className="user-home__estimations-list-item">
        <div style={{ 
          position: "absolute", 
          right: "11px" 
        }}>
          { 
            status === "ready"
            ?  <span>???</span> 
            : <span>??????</span>
          }
        </div>

        <div>Request ID : { id }</div>

        <div>
          Estimation :&nbsp;  
          {
            status === "ready"
            ? <a 
                href="javascript:void(0)" 
                onClick={ () => handleInProgressClick(id) }
              >
                <u>View</u>
              </a>
            : <a 
                href="javascript:void(0)" 
                onClick={ () => handleInProgressClick(id) }
              >
                <u>View</u>
              </a>
          } 
        </div>
        
        <div>
          <span>Submitted Date :&nbsp;</span>
          <Moment format="YYYY/MM/DD">{ date }</Moment>
        </div>
      </div>
    )
  }

  return (
    <div className="user-home">
      <NavBar hightlights={['user']}/>

      <div className="user-home__content">
        <div className="new-request__attention">
          <QueueGrid 
            userRequest={ userLastRequest }
            lastEstimatedRequest={ lastEstimatedRequest }
          />
        </div>
        

        <div className="user-home__note">
          <div><b>Notes</b></div>
        
          <div className="user-home__note__content">
            <div>?????? ??? &#8594; Estimation is ready.</div>

            <div>?????? ?????? &#8594; Estimation is in progress.</div>
          </div>
        </div>

        <div className="user-home__estimation-list">
          <div><b>Estimations List</b></div>

          <div style={{
            margin: "19px 0px 0px 0px",
            padding: "0px 19px 19px 19px",

            borderTop: "1px solid",
          }}>
            { 
              requests.map(req => {
                return estimationsListItem(req.createdAt, req.id, req.unlocked? "ready" : "inprogress");
              })
            }
          </div>
        </div>  
      </div>
    </div>
  );
}

export default UserHome;