import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import NavBar from "../../components/nav-bar";

import { isJwtEmptyOrInvalid } from "../../util/jwt-util";
import { getCensoredReportByRequestId, getRequestById } from "../../util/request-report-util";

import Moment from "react-moment";

const requestById = (props: any) => {
  console.log('requesById', 'props', props);

  const router = useRouter();
  
  const [ request, setRequest ] = useState();
  const [ censoredReport, setCensoredReport ] = useState();



  const result = (
    <div>
      <div style={{ textAlign: "center" }}>
        <b>Result Tier</b>
      </div>
      
      <div style={{ 
        margin: "11px 0px 0px 0px", 
        display: "flex" 
      }}>
        {
          censoredReport?.finalScore <= 14.2 
          ? <img height={ "100" } width={ "100" } src={ 'https://i.ibb.co/5GtqbtY/f-tier-logo.png' } /> 
          : null
        }

        {
          censoredReport?.finalScore <= 28.4 && censoredReport?.finalScore > 14.2
          ? <img height={ "100" } width={ "100" } src={ 'https://i.ibb.co/ZXwxtT0/e-tier-logo.png' } /> 
          : null
        }

        {
          censoredReport?.finalScore <= 42.6 && censoredReport?.finalScore > 28.4
          ? <img height={ "100" } width={ "100" } src={ 'https://i.ibb.co/vYWYdxh/d-tier-logo.png' } /> 
          : null
        }

        {
          censoredReport?.finalScore <= 56.8 && censoredReport?.finalScore > 42.6
          ? <img height={ "100" } width={ "100" } src={ 'https://i.ibb.co/XV2G6Pc/c-tier-logo.png' } /> 
          : null
        }

        {
          censoredReport?.finalScore <= 71 && censoredReport?.finalScore > 56.8
          ? <img height={ "100" } width={ "100" } src={ 'https://i.ibb.co/r2x54zM/b-tier-logo.png' } /> 
          : null
        }

        {
          censoredReport?.finalScore <= 85.2 && censoredReport?.finalScore > 71
          ? <img height={ "100" } width={ "100" } src={ 'https://i.ibb.co/6DBcJmS/a-tier-logo.png' } /> 
          : null
        }

        {
          censoredReport?.finalScore > 85.2 
          ? <img height={ "100" } width={ "100" } src={ 'https://i.ibb.co/sCMW8Nz/s-tier-logo.png' } /> 
          : null
        }
      </div>
    </div>
  )

  const requestStatus =  (
      <div className="request-status">
        <div className="request-status__icon">
          <span>{ request?.unlocked? "✅" : "⛏️" }</span> 
        </div>

        <div>Request ID : { request?.id }</div>

        <div>Estimation : { request?.unlocked? "Ready" : "In progress" }</div>

        <div>
          <span>Submitted Date :&nbsp;</span>
          <Moment format="YYYY/MM/DD">{ request?.createdAt }</Moment>
        </div>
      </div>
  )
  

  useEffect(() => {
    if(!isJwtEmptyOrInvalid()) {
      getRequestById(props.id).then(res => { 
        setRequest(res); 
        
        getCensoredReportByRequestId(res.id).then(res => {
          setCensoredReport(res);
          console.log(res);
        })
      }).catch(err => {
        alert('Opps. Something is wrong.');
        router.push(`${ process.env.NEXT_PUBLIC_DOMAIN }/user-home`);
      });
    }else {
      router.push(`${ process.env.NEXT_PUBLIC_DOMAIN }`);
    }
  }, []);

  return (
    <div className="requests_id">
      <NavBar/>

      <div className="requests_id__content">
        { request?.unlocked ? result : null }

        
        <div style={{ 
          margin:  request?.unlocked 
          ? "37px 0px 0px 0px" 
          : "0px 0px 0px 0px"
        }}>
          <b>Estimation Status</b>
        </div>
        <div style={{
          fontSize: "16px", 
          margin: "11px 0px 0px 0px"
        }}>
          <b>◾️ 👥 Queue Position : { request?.queuePos }</b>
        </div>
        { requestStatus }
      </div>
    </div>
  );
}

export default requestById;

export async function getServerSideProps(ctx: any) {
  console.log('UserHome', 'getServerSideProps', ctx);

  const { id } = ctx.params;

  return { props: { id: id } };
}

