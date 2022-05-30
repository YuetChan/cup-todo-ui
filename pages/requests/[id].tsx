import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { isJwtEmptyOrInvalid } from "../../util/jwt-util";
import { getRequestById } from "../../util/request-report-util";
import NavBar from "../../components/nav-bar";
import Moment from "react-moment";

export default function requestById(props: any) {
  console.log("requesById", props)

  const router = useRouter();

  const [ id, setId ] = useState(-1);
  const [ request, setRequest ] = useState();

  const requestStatus = () => {
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
          <span>{ request?.unlocked? "✅": "⛏️" }</span> 
        </div>
        <div>Request ID : { request?.id }</div>

        <div><b>Queue Position : { request?.queuePos }</b></div>

        <div>Estimation : { request?.unlocked? "Ready" : "In progress" }</div>

        <div>
          Submitted Date :&nbsp;
          <Moment format="YYYY/MM/DD">{ request?.createdAt }</Moment>
        </div>
      </div>
    )
  }

  useEffect(() => {
    const { id } = props;

    setId(id);

    if(!isJwtEmptyOrInvalid()) {
      getRequestById(id).then(res => {
        setRequest(res);
      }).catch(err => {
        alert('Opps. Something is wrong.');
        router.push(`${ process.env.NEXT_PUBLIC_DOMAIN }/user-home`);
      });
    }else {
      router.push(`${ process.env.NEXT_PUBLIC_DOMAIN }`);
    }
  }, []);

  useEffect(() => {
    console.log(request)
  }, [request]);

  return (
    <div >
      <NavBar/>

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        padding: "74px 0px 37px 0px",
        fontSize: "19px"
      }}>
        <div><b>Estimation Request Status</b></div>
        
        { requestStatus() }
      </div>
    </div>
  );
  
}

export async function getServerSideProps(ctx: any) {
  console.log('UserHome', 'getServerSideProps', ctx);

  const { id } = ctx.params;

  return { 
    props: { 
      id: id
    } 
  };
}