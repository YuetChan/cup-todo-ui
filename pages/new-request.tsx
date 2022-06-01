
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Button, TextareaAutosize } from "@mui/material";

import NavBar from "../components/nav-bar";

import { getSessionUserEmail, getUserByEmail } from "../util/user-util";
import { isJwtEmptyOrInvalid } from "../util/jwt-util";
import { submitRequest } from "../util/request-report-util";

const NewRequest = (props: any) => { 
  console.log('NewRequest', 'props', props);

  const router = useRouter();

  const [ srcOfIncome, setSrcOfIncome ] = useState('');
  const [ skillSet, setSkillSet ] = useState('');
  const [ physique, setPhysique ] = useState('');
  const [ bonus, setBonus ] = useState('');

  const handleSrcOfIncomeTextareaChange = (e) => { setSrcOfIncome(e.target.value); }
  const handleSkillSetTextareaChange = (e) => { setSkillSet(e.target.value); }
  const handlePhysiqueTextareaChange = (e) => { setPhysique(e.target.value); }
  const handleBonusTextareaChange = (e) => { setBonus(e.target.value); }

  const handleSubmitClick = () => {
    console.log('handleSubmitClick');

    const json = JSON.stringify({
      data: {
        request: {
          sourceOfIncome: srcOfIncome,
          skillSet: skillSet,
          physique: physique,
          bonus: bonus
        }
      }
    });

    submitRequest(json).then(res => {
      alert('Submitted successfullly.');
      router.push(`${process.env.NEXT_PUBLIC_DOMAIN}/user-home`);
    }).catch(err => {
      alert("Opps. Submission failed. Please try again later.")
    })
  }

  useEffect(() => {
    if(!isJwtEmptyOrInvalid()) {
      getUserByEmail(getSessionUserEmail()).then(res => {
        if(res?.uploadQuota.full) {
          alert("Opps, your estimation quota is full.")
          router.push(`${process.env.NEXT_PUBLIC_DOMAIN}/user-home`);
        }
      })
    }else {
      router.push(`${process.env.NEXT_PUBLIC_DOMAIN}`);
    }
  }, []);

  const _srcOfIncome = (
    <div className="new-request__question">
      <div><b>Source of Income</b></div>

      <div className="new-request__answer">
        <TextareaAutosize
          aria-label="Source of income"
          minRows={ 7 }
          maxLength={ 100 }
          placeholder="Enter your source of income"
          style={{ width: 513 }}

          onChange={ handleSrcOfIncomeTextareaChange }
        />
      </div>
    </div>
  )

  const _skillSet = (
    <div className="new-request__question">
      <div><b>Skill Set</b></div>

      <div className="new-request__answer">
        <TextareaAutosize
          aria-label="Skill set"
          minRows={ 7 }
          maxLength={ 100 }
          placeholder="Enter your skill set"
          style={{ width: 513 }}

          onChange={ handleSkillSetTextareaChange }
        />
      </div>
    </div>
  )

  const _physique = (
    <div className="new-request__question">
      <div><b>Physique</b></div>

      <div className="new-request__answer">
        <TextareaAutosize
          aria-label="Physique"
          minRows={ 7 }
          maxLength={ 100 }
          placeholder="Enter your physique"
          style={{ width: 513 }}

          onChange={ handlePhysiqueTextareaChange }
        />
      </div>
    </div>
  )

  const _bonus = (
    <div className="new-request__question">
      <div><b>Achievement</b></div>

      <div className="new-request__answer">
        <TextareaAutosize
          aria-label="Achievement"
          minRows={ 7 }
          maxLength={ 100 }
          placeholder="Enter your achievement"
          style={{ width: 513 }}

          onChange={ handleBonusTextareaChange }
        />
      </div>
    </div>
  )

  const submitBtn = (
    <div style={{
      display: "flex",
      margin: "37px 0px 0px 0px"
    }}>
      <Button 
        size='large' 
        variant="outlined"
        onClick={ handleSubmitClick }>
          Submit
      </Button>
    </div>
  )

  return (
    <div className="new-request">
      <NavBar />

      <div className="new-request__content">
        <div className="new-request__note">
          <div><b>Note</b></div>
        
          <div className="new-request__note__content">
            <div>◾️ Please fill out all FOUR questions.</div>

            <div> ◾️ Please utilize BULLET POINTS for accurate estimation.</div>
          </div>
        </div>

        {_srcOfIncome}
        {_skillSet}
        {_physique}
        {_bonus}
        
        {submitBtn}
      </div>
    </div>
  )
}

export default NewRequest;