import { useCallback } from "react"

const Popup = ({clickHandler , text , setShow}) => {
    const closeFunction = useCallback( () => {
      setShow((value) => ({...value , isActive : false}))
    } , [setShow] )
    return(
      <div className="wrapper__popup">
    <div className="black__wrapper" onClick={() => {
      closeFunction()
    }}>
      </div>
      <div className="popup">
        <p style={{
          color : "white",
          fontFamily : "SF Pro Display"
        }}>{text}</p>
        <div className="popup__bottom">
          <button onClick={clickHandler} className="button">Да</button>
          <button onClick={closeFunction} className="button">Нет</button>
        </div>
      </div>
      </div>
    
    )
  }
  export default Popup