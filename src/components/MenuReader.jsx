import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tesseract from 'tesseract.js'
import OpenAI from './OpenAI'

const ariaLabel = { 'aria-label': 'description' };

const MenuReader = () => {
  const [ocr, setOcr] = useState("");
  const [dish, setDish] = useState("")
  const dataUri = useSelector(state => state.dataUri.dataUri)
  const dispatch = useDispatch()


  Tesseract.recognize(dataUri)

    .then(function (result) {

      setOcr(result.data.text)
      console.log(ocr)
    })






  return (
    <>
      <div>

        <br />
        <br />

        <OpenAI ocr={ocr} />


      </div>

    </>
  )
}

export default MenuReader